import * as S from "./style";

import { Button, Input, Modal, RequiredSymbol } from "@/components";
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, StyleSheet, Platform, TouchableWithoutFeedback, View, Text } from "react-native";
import { useHttpCommon, useYup } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/FormErrorMessage";
import { COLORS } from "@/constants";
import { useFetchClassrooms } from "../../hooks/useFetchClassrooms";
import { useFetchClassroomMembersByClassroomId } from "../../hooks/useFetchClassroomMembersByClassroomId";
import useSWR from "swr";
import { UserPT } from "@/types/User";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useFetchClassroomEventsbyClassroomId } from "../../hooks/useFetchClassroomEventsbyClassroomId";



type Props = {
    isModalOpen: boolean,
    handleCloseModal: () => void
    idClassroom: number
}

export function AddUserToClassroom({
    isModalOpen,
    handleCloseModal,
    idClassroom
}: Props) {
    const { api } = useHttpCommon()
    const { mutate: usersMutate, data: currentUsers } = useFetchClassroomMembersByClassroomId(idClassroom)
    const { mutate: eventsMutate } = useFetchClassroomEventsbyClassroomId(idClassroom)
    const [allUsers, setAllUsers] = useState<UserPT[]>([])
    const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false)
    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false)
    const [idUsuario, setIdUsuario] = useState<string>("");
    const [isFocus, setIsFocus] = useState<boolean>(false);

    async function fetchAllUsers() {
        setIsLoadingUsers(true)
        try {
            const { data } = await api<UserPT[]>({
                url: '/usuario/usuariosListagem'
            })
            

            const filteredData = data.filter(user => user.id_usuario !== idUsuario)           

            setAllUsers(filteredData)
            setIsLoadingUsers(false)

        } catch (ex) {
            setIsLoadingUsers(false)
            Alert.alert("Erro", "Ocorreu um erro ao buscar usuários")
        }
    }

    useEffect(() => {
        fetchAllUsers()
        usersMutate()
    }, [])


    async function handleSubmitNewClassroom() {
        try {
            setIsLoadingPost(true)
            await api({
                method: 'POST',
                url: `/sala/${idClassroom}/adicionarUsuario/${idUsuario}`,
            })
            usersMutate()
            eventsMutate()
            Alert.alert('Sucesso!', 'Integrante adicionado com sucesso!')
            setIdUsuario('')
            setIsLoadingPost(false)
            handleCloseModal()
        } catch (error: any) {
            console.log('error', error)
            setIsLoadingPost(false)
            Alert.alert('Erro!', 'Ocorreu um erro ao adicionar integrante!')
        }
    }

    function onCloseModal() {
        setIdUsuario('')
        handleCloseModal()
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <S.Content>
                    <Modal visible={isModalOpen} title="Adicionar usuário" closeModal={onCloseModal} >
                        <S.ModalBody>
                            <Text >
                                <RequiredSymbol />
                                Pesquise pelo e-mail do usuário
                            </Text>
                            <View style={styles.container}>
                                <Dropdown
                                    style={[isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={allUsers}
                                    search
                                    maxHeight={300}
                                    labelField="email"
                                    valueField="id_usuario"

                                    placeholder={!isFocus ? 'Selecione o usuário' : '...'}
                                    searchPlaceholder="Busca..."
                                    value={idUsuario}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setIdUsuario(item.id_usuario);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>
                            <S.ButtonSpace>
                                {isLoadingPost ? (
                                    <ActivityIndicator size="large" color={COLORS.BLUE_DARK1} />
                                ) : (
                                    <>
                                        <Button.Common
                                            color="light"
                                            title="cancelar"
                                            style={{ width: "45%" }}
                                            onPress={() => {
                                                setIdUsuario('')
                                                handleCloseModal()
                                            }}
                                            disabled={isLoadingPost}
                                        />
                                        <Button.Common
                                            onPress={handleSubmitNewClassroom}
                                            color="dark"
                                            title="salvar"
                                            style={{ width: "45%" }}
                                            disabled={isLoadingPost || !idUsuario}
                                        />
                                    </>
                                )}
                            </S.ButtonSpace>
                        </S.ModalBody>
                    </Modal>
                </S.Content>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});