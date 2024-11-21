import * as S from './style';

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header, Tabs, Event, Breadcrumb, Modal, Button } from "@/components";
import { format } from "date-fns";
import { useClassroomCalendar, useHttpCommon } from "@/hooks";
import { Pressable, View, Text, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useFetchClassroomMembersByClassroomId } from '../../hooks/useFetchClassroomMembersByClassroomId';
import { useFetchClassroomEventsbyClassroomId } from '../../hooks/useFetchClassroomEventsbyClassroomId';
import { UserAvatar } from '@/components/UserAvatar';
import { ClassroomMember } from '@/types';
import { useState } from 'react';
import { AddClassroomEvent } from '../AddClassroomEvent';
import { ptBR } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '@/constants';
import { AddUserToClassroom } from '../AddUserToClassroom';


export function ClassroomDetailsScreen() {
    const today = format(new Date(), "dd/MMM", { locale: ptBR });

    const params = useLocalSearchParams<{ idClassroom: string }>();
    const [idClassroom, name, isAdmin] = params.idClassroom?.split(",") ?? [];

    const { api } = useHttpCommon()
    const { data: membersList, isLoading: isLoadingMembers, mutate: eventsMutate } =
        useFetchClassroomMembersByClassroomId(Number(idClassroom));
    const { data: eventsList, isLoading: isLoadingEvents, mutate: membersMutate } =
        useFetchClassroomEventsbyClassroomId(Number(idClassroom));
    const { Calendar, todayEvents, nextEvents } = useClassroomCalendar(eventsList);

    const [toggleModalUserData, setToggleModalUserData] = useState<boolean>(false)
    const [modalData, setModalData] = useState<ClassroomMember | null>(null)
    const [toggleModalAddUser, setToggleModalAddUser] = useState<boolean>(false)

    const [isLoadingAddNewAdmin, setIsLoadingAddNewAdmin] = useState<boolean>(false)

    function handleCloseModal() {
        setToggleModalUserData(false)
    }

    function handleOpenModal(member: ClassroomMember) {
        setModalData(member)
        setToggleModalUserData(true)
    }


    function handleOpenModalAddUser() {
        setToggleModalAddUser(true);
    }

    function handleCloseModalAddUser() {
        setToggleModalAddUser(false);
    }

    async function handleAddNewAdmin() {
        try {
            setIsLoadingAddNewAdmin(true)
            await api({
                url: `/sala/${idClassroom}/adicionarVice/${modalData?.usuario.id_usuario}`,
                method: "PATCH"
            })
            membersMutate()
            eventsMutate()
            setIsLoadingAddNewAdmin(false)
            Alert.alert("Sucesso", `Admin ${modalData?.usuario.nome} adicionado(a) com sucesso!`)
            handleCloseModal()
        } catch (ex) {
            handleCloseModal()
            setIsLoadingAddNewAdmin(false)
            Alert.alert("Erro", "Ocorreu um erro ao adicionar novo admin")
        }
    }
    return (
        <S.Wrap>
            <Header.ProfileInfo />
            <SafeAreaProvider>
                <S.Container>
                    <S.TitleCreate>
                        <Breadcrumb dividedPath={['salas', name]} />
                    </S.TitleCreate>
                    <S.Content>
                        <AddClassroomEvent idClassroom={Number(idClassroom)} />
                        {isLoadingEvents || isLoadingMembers ? (
                            <ActivityIndicator size="large" />
                        ) : (
                            <>
                                <Calendar />
                                <S.Members>
                                    <S.MembersTitle>integrantes</S.MembersTitle>
                                    <S.MembersList>
                                        {membersList?.map((member, index) => (
                                            <Pressable onPress={() => handleOpenModal(member)} key={index}>
                                                <UserAvatar
                                                    isAdmin={
                                                        member.funcaoUsuario === "REPRESENTANTE" ||
                                                        member.funcaoUsuario === "VICE_REPRESENTANTE"
                                                    }
                                                    userName={member.usuario.nome}
                                                    size='sm'
                                                />
                                            </Pressable>
                                        ))}
                                        <S.PressableSpace onPress={handleOpenModalAddUser}>
                                            <FontAwesomeIcon icon={faUserPlus} size={20} color={COLORS.BLUE_SECONDARY} />
                                        </S.PressableSpace>
                                    </S.MembersList>
                                    {toggleModalAddUser && (
                                        <AddUserToClassroom handleCloseModal={handleCloseModalAddUser} idClassroom={Number(idClassroom)} isModalOpen={toggleModalAddUser} />
                                    )}
                                </S.Members>
                                <S.Shape>
                                    <S.EventsTitle>
                                        <S.EventsTitleText>eventos</S.EventsTitleText>
                                    </S.EventsTitle>
                                    <Tabs
                                        items={[
                                            {
                                                title: `Hoje - ${today}`,
                                                component: (
                                                    <View
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            padding: 10,
                                                        }}
                                                    >
                                                        {todayEvents.map((event, index) => (
                                                            <Event.Classroom
                                                                key={index}
                                                                notificationType={event.notificationType}
                                                                priority={event.priority}
                                                                time={event.time}
                                                                title={event.title}
                                                                description={event.description}
                                                            />
                                                        ))}
                                                    </View>
                                                ),
                                            },
                                            {
                                                title: "Próximos dias",
                                                component: (
                                                    <View
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            padding: 10,
                                                        }}
                                                    >
                                                        {nextEvents.map((event, index) => (
                                                            <Event.Classroom
                                                                key={index}
                                                                notificationType={
                                                                    event.notificationType
                                                                }
                                                                date={event.date}
                                                                priority={event.priority}
                                                                time={event.time}
                                                                title={event.title}
                                                                description={
                                                                    event.description
                                                                }
                                                            />
                                                        ))}
                                                    </View>
                                                ),
                                            },
                                        ]}
                                    />
                                </S.Shape>
                                {modalData && (
                                    <Modal visible={toggleModalUserData} closeModal={handleCloseModal} hasHeader={false}>
                                        <S.ModalBody>
                                            <S.UserDataSpace>
                                                <UserAvatar
                                                    isAdmin={modalData.funcaoUsuario === "REPRESENTANTE"}
                                                    size='lg'
                                                    userName={modalData.usuario.nome}
                                                    hasGear={false}
                                                />
                                                <S.UserInfo>
                                                    <Text>
                                                        <Text style={{ fontWeight: "800" }}>nome: </Text>
                                                        {modalData.usuario.nome}
                                                    </Text>
                                                    <Text>
                                                        <Text style={{ fontWeight: "800" }}>e-mail: </Text>
                                                        {modalData.usuario.email}
                                                    </Text>
                                                </S.UserInfo>
                                            </S.UserDataSpace>
                                            <S.ButtonSpace>
                                                {isLoadingAddNewAdmin ? (
                                                    <ActivityIndicator size="large" color={COLORS.BLUE_DARK1} />
                                                ) : (
                                                    <S.ButtonWhite title='tornar admin' onPress={handleAddNewAdmin} />
                                                )}
                                            </S.ButtonSpace>
                                        </S.ModalBody>
                                    </Modal>
                                )}
                            </>
                        )}
                    </S.Content>
                </S.Container>
            </SafeAreaProvider>
        </S.Wrap>
    );
}
