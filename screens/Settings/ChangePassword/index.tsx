import * as S from "./style";
import { useSession } from "@/app/contexts";
import { Breadcrumb, Button, Header, Input } from "@/components";
import { ErrorMessage } from "@/components/FormErrorMessage";
import { COLORS } from "@/constants";
import { useHttpCommon, useYup } from "@/hooks";
import { faBell, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link, router, useNavigation } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Alert, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

type FormValues = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export function ChangePasswordScreen() {
    const { session } = useSession();
    const { api } = useHttpCommon()

    const { resolver } = useYup<FormValues>((yup) => {
        return yup.object().shape({
            currentPassword: yup.string().required("Senha atual é obrigatória"),
            newPassword: yup.string().required("A senha é obrigatória"),
            confirmPassword: yup.string().required("A confirmação de senha é obrigatória")
                .oneOf([yup.ref("newPassword"), ""], "As senhas não coincidem")
        })
    })

    const { control, handleSubmit, reset, watch, resetField,
        formState: { errors, isValid, isSubmitting, }
    } = useForm<FormValues>({
        resolver: resolver,
        mode: "all"
    });

    async function onSubmit() {
        try {
            await api({
                url: `/autenticacao/redefinicaoSenha/${session?.id}`,
                data: {
                    senhaAtual: watch("currentPassword"),
                    senhaNova: watch("newPassword"),
                    senhaConfirmada: watch("confirmPassword")
                },
                method: "PATCH"
            })

            resetField("confirmPassword")
            resetField("newPassword")
            resetField("currentPassword")
            Alert.alert("Senha alterada com sucesso")
        } catch (error) {
            Alert.alert("Ocorreu um erro ao alterar sua senha!")
        }
    }

    return (
        <S.Wrap>
            <Header.ProfileInfo />
            <SafeAreaProvider>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <S.Container>
                        <S.TitleCreate>
                            <S.TitleScreen>CONFIGURAÇÕES</S.TitleScreen>
                            <Breadcrumb dividedPath={['config', "Alterar Senha"]} />

                        </S.TitleCreate>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                            style={{ flex: 1 }}
                        >
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                                <S.ListOptions>
                                    <Controller
                                        control={control}
                                        name="currentPassword"
                                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                            <>
                                                <Input.Password
                                                    label="Senha atual"
                                                    placeholder="Digite sua senha atual"
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    required
                                                />
                                                <ErrorMessage error={error?.message} />
                                            </>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="newPassword"
                                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                            <>
                                                <Input.Password
                                                    label="Nova senha"
                                                    placeholder="Digite sua nova senha"
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    required
                                                />
                                                <ErrorMessage error={error?.message} />
                                            </>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="confirmPassword"
                                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                            <>
                                                <Input.Password
                                                    label="Confirme sua nova senha"
                                                    placeholder="Digite sua nova senha novamente"
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    required
                                                />
                                                <ErrorMessage error={error?.message} />
                                            </>
                                        )}
                                    />

                                    <S.ButtonSpace>
                                        {isSubmitting ? (
                                            <ActivityIndicator size="large" color={COLORS.WHITE} />
                                        ) : (
                                            <>
                                                <Button.Common
                                                    color="light"
                                                    title="voltar"
                                                    style={{ width: "45%" }}
                                                    onPress={() => {
                                                        resetField("confirmPassword")
                                                        resetField("newPassword")
                                                        resetField("currentPassword")
                                                        router.back()
                                                    }}
                                                />
                                                <Button.Common
                                                    onPress={handleSubmit(onSubmit)}
                                                    color="dark"
                                                    title="alterar"
                                                    style={{ width: "45%" }}
                                                    disabled={isSubmitting || !isValid}
                                                />
                                            </>
                                        )}
                                    </S.ButtonSpace>

                                </S.ListOptions>
                            </ScrollView>
                        </KeyboardAvoidingView>

                    </S.Container>

                </TouchableWithoutFeedback>
            </SafeAreaProvider>
        </S.Wrap>
    );
}