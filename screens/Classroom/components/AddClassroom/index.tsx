import * as S from "./style";

import { Button, Header, Input, LogoText, Modal } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Classroom } from "@/components";
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { Classroom as TClassroom, Priority } from "@/types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Dispatch, useState } from "react";
import { useHttpCommon, useYup } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import Collapsible from "react-native-collapsible";
import { ErrorMessage } from "@/components/FormErrorMessage";
import { COLORS } from "@/constants";
import { useFetchClassrooms } from "../../hooks/useFetchClassrooms";


type FormValues = {
    nome: string,
    descricao: string
}

type Props = {
    isCollapseOpen: boolean,
    handleCloseModal: () => void
}

export function AddClassroom({
    isCollapseOpen,
    handleCloseModal
}: Props) {
    const { api } = useHttpCommon()
    const { mutate } = useFetchClassrooms()

    const { resolver } = useYup<FormValues>((yup) => {
        return yup.object().shape({
            nome: yup.string().required("Campo obrigatório"),
            descricao: yup.string()
        })
    })

    const { control, watch, reset, handleSubmit, formState: { isSubmitting, isValid, errors } } = useForm<FormValues>({
        resolver,
        defaultValues: {
            nome: "",
            descricao: "",
        },
        mode: 'all'
    })

    async function handleSubmitNewClassroom() {
        try {
            await api({
                method: 'POST',
                url: '/sala/criarSala',
                data: {
                    nome: watch("nome"),
                    descricao: watch("descricao"),
                }
            })
            mutate()
            Alert.alert('Sucesso!', 'Sala criado com sucesso!')
            reset()
            handleCloseModal()
        } catch (error: any) {
            Alert.alert('Erro!', 'Ocorreu um erro ao criar sala!')
        }
    }

    function onCloseModal() {
        reset()
        handleCloseModal()
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <S.Content>
                    <Modal visible={isCollapseOpen} title="Criar sala" closeModal={onCloseModal} >
                        <S.ModalBody>
                            <Controller
                                control={control}
                                name="nome"
                                render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                                    <>
                                        <Input.Text
                                            label="Nome da sala"
                                            value={value}
                                            required
                                            type="gray"
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            placeholder="Ex.: SI - 2022.1"
                                        />
                                        <ErrorMessage error={error?.message} />
                                    </>
                                )}
                            />
                            <Controller
                                control={control}
                                name="descricao"
                                render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                                    <>
                                        <Input.TextArea
                                            label="Descrição"
                                            value={value}
                                            onChangeText={onChange}
                                            type="gray"
                                            onBlur={onBlur}
                                            placeholder="Ex.: Sala de TCC - SI 2024.2"
                                        />
                                        <ErrorMessage error={error?.message} />
                                    </>
                                )}
                            />
                            <S.ButtonSpace>
                                {isSubmitting ? (
                                    <ActivityIndicator size="large" color={COLORS.BLUE_DARK1} />
                                ) : (
                                    <>
                                        <Button.Common
                                            color="light"
                                            title="cancelar"
                                            style={{ width: "45%" }}
                                            onPress={() => {
                                                reset()
                                                handleCloseModal()
                                            }}
                                            disabled={isSubmitting}

                                        />
                                        <Button.Common
                                            onPress={handleSubmit(handleSubmitNewClassroom)}
                                            color="dark"
                                            title="salvar"
                                            style={{ width: "45%" }}
                                            disabled={isSubmitting || !isValid}
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
