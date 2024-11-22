import * as S from "./style"

import { useSession } from "@/app/contexts";
import { Breadcrumb, Button, Header, Input, Event } from "@/components";
import { ErrorMessage } from "@/components/FormErrorMessage";
import { COLORS } from "@/constants";
import { useHttpCommon, useYup } from "@/hooks";
import { usePersonalCalendarService } from "@/screens/Home/hooks/usePersonalCalendarService";
import { EventResponse } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { router } from "expo-router";
import { useEffect } from "react";
import {
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView,
    Platform, Alert, ScrollView, ActivityIndicator,
    View, Text
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

type FormValues = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export function ManageNotificationScreen() {
    const { session } = useSession();

    const { data, isLoading, mutate } = usePersonalCalendarService<EventResponse[]>();

    useEffect(() => {
        mutate()
    }, [])


    return (
        <S.Wrap>
            <Header.ProfileInfo />
            <SafeAreaProvider>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <S.Container>
                        <S.TitleCreate>
                            <S.TitleScreen>CONFIGURAÇÕES</S.TitleScreen>
                            <Breadcrumb dividedPath={['config', "gerenciar notificações"]} />
                        </S.TitleCreate>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                            style={{ flex: 1 }}
                        >
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                <S.ListOptions >
                                    {data?.map((event, index) => (
                                        <S.ItemEvent >
                                            <Event.Personal
                                                key={index}
                                                date={format(event.evento.dt_evento, "dd/MMM", { locale: ptBR })}
                                                time={format(event.evento.dt_evento, "HH:mm")}
                                                title={event.evento.titulo}
                                                description={event.evento.descricao}
                                                notificationType={event.tipoNotificacao}
                                                priority={event.tipoPrioridade}
                                                origin={event.nm_origem}
                                            />
                                            <S.ActiveNotification>notificação ativa</S.ActiveNotification>
                                        </S.ItemEvent>
                                    ))}
                                </S.ListOptions>
                                <S.ListOptions>
                                    <S.ButtonSpace>
                                        <Button.Common
                                            color="light"
                                            title="voltar"
                                            style={{ width: "45%" }}
                                            onPress={() => {
                                                router.back()
                                            }}
                                        />
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