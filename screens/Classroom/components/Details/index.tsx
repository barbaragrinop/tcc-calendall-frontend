import * as S from './style';

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header, Tabs, Event, Breadcrumb, Modal } from "@/components";
import { format } from "date-fns";
import { useClassroomCalendar } from "@/hooks";
import { Pressable, View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useFetchClassroomMembersByClassroomId } from '../../hooks/useFetchClassroomMembersByClassroomId';
import { useFetchClassroomEventsbyClassroomId } from '../../hooks/useFetchClassroomEventsbyClassroomId';
import { UserAvatar } from '@/components/UserAvatar';
import { ClassroomMember } from '@/types';
import { useState } from 'react';
import { AddClassroomEvent } from '../AddClassroomEvent';
import { ptBR } from 'date-fns/locale';


export function ClassroomDetailsScreen() {
    const params = useLocalSearchParams<{ idClassroom: string }>();

    const [idClassroom, name] = params.idClassroom?.split(",") ?? [];

    const { data: membersList, isLoading: isLoadingMembers } = useFetchClassroomMembersByClassroomId(Number(idClassroom));
    const { data: eventsList, isLoading: isLoadingEvents } = useFetchClassroomEventsbyClassroomId(Number(idClassroom));
    const { Calendar, todayEvents, nextEvents } = useClassroomCalendar(eventsList);

    const [toggleModalUserData, setToggleModalUserData] = useState<boolean>(false)
    const [modalData, setModalData] = useState<ClassroomMember | null>(null)

    function handleCloseModal() {
        setToggleModalUserData(false)
    }

    function handleOpenModal(member: ClassroomMember) {
        setModalData(member)
        setToggleModalUserData(true)
    }

    const today = format(new Date(), "dd/MMM", { locale: ptBR });


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
                                                    isAdmin={member.funcaoUsuario === "REPRESENTANTE"}
                                                    userName={member.usuario.nome}
                                                    size='sm'
                                                />
                                            </Pressable>
                                        ))}
                                    </S.MembersList>
                                </S.Members>
                                <S.Shape>
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
                                                            padding: 10
                                                        }}
                                                    >
                                                        {todayEvents.map((event, index) => (
                                                            <Event.Personal
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
                                                title: "Próximos eventos",
                                                component: (
                                                    <View
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            padding: 10
                                                        }}
                                                    >
                                                        {nextEvents.map((event, index) => (
                                                            <Event.Personal
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
