import * as S from "./style";
import { useSession } from "@/app/contexts";
import { Button, Header, Input } from "@/components";
import { ErrorMessage } from "@/components/FormErrorMessage";
import { COLORS } from "@/constants";
import { useYup } from "@/hooks";
import { faBell, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link, useNavigation } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

type FormValues = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export function SettingsScreen() {
    const { session } = useSession();

    const { resolver } = useYup<FormValues>((yup) => {
        return yup.object().shape({
            currentPassword: yup.string().required("Senha atual é obrigatória"),
            newPassword: yup.string().required("A senha é obrigatória"),
            confirmPassword: yup.string().required("A confirmação de senha é obrigatória")
                .oneOf([yup.ref("password"), ""], "As senhas não coincidem")
        })
    })

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: resolver,
        mode: "all"
    });

    // const onSubmit = async (data: FormValues) => {
    //     try {
    //         await api.put(`/users/${user.id}`, {
    //             ...data
    //         });

    //         addToast({
    //             type: "success",
    //             title: "Senha alterada com sucesso",
    //             description: "Sua senha foi alterada com sucesso"
    //         });
    //     } catch (error) {
    //         addToast({
    //             type: "error",
    //             title: "Erro ao alterar senha",
    //             description: "Ocorreu um erro ao alterar sua senha, tente novamente"
    //         });
    //     }
    // }

    return (
        <S.Wrap>
            <Header.ProfileInfo />
            <SafeAreaProvider>
                <S.Container>

                    <S.TitleCreate>
                        <S.TitleScreen>CONFIGURAÇÕES</S.TitleScreen>
                    </S.TitleCreate>

                    <S.ListOptions>
                        <Link href="/(auth)/(tabs)/settings/change-password">
                            <S.Item style={{
                                backgroundColor: COLORS.BLUE_3,
                            }}>
                                <FontAwesomeIcon icon={faKey} size={20} color="#fff" />
                                <S.ItemText>Alterar Senha</S.ItemText>
                            </S.Item>
                        </Link>
                        <Link
                            href="/(auth)/(tabs)/settings/manage-notifications"
                        >
                            <S.Item style={{
                                backgroundColor: COLORS.BLUE_3,
                            }}>
                                <FontAwesomeIcon icon={faBell} size={20} color="#fff" />
                                <S.ItemText>Gerenciar Notificações</S.ItemText>
                            </S.Item>
                        </Link>
                    </S.ListOptions>

                </S.Container>
            </SafeAreaProvider>
        </S.Wrap>
    );
}