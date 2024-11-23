import * as S from "./style"
import * as Notifications from 'expo-notifications'

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
import { useEffect, useState } from "react";
import {
    StyleSheet,
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView,
    Platform, Alert, ScrollView, ActivityIndicator,
    View, Text,
    Switch
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

type FormValues = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export function ManageNotificationScreen() {
    const { session } = useSession();
    const [isEnabled, setIsEnabled] = useState(true);
    const { data, isLoading, mutate } = usePersonalCalendarService<EventResponse[]>();

    useEffect(() => {
        mutate()
    }, [])

    function toggleSwitch() {
        setIsEnabled(previousState => !previousState)
    }

    async function handleOnChangeSwitch(ev: EventResponse) {
        const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
        const notificationId = `calendario-pessoal-${ev.evento.id_evento}`;

        // Verifica se alguma notificação tem o mesmo ID
        const existingNotification = scheduledNotifications.find(
            (notification) => notification.identifier === notificationId
        );
        
        if (isEnabled) {
            Notifications.cancelScheduledNotificationAsync(`calendario-pessoal-${1}`)
        }
        // Cancel notification by id

    }


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
                                            <S.ConfirmSpace>
                                                <Switch
                                                    trackColor={{ false: '#767577', true: COLORS.BLUE_LIGHT }}
                                                    thumbColor={isEnabled ? COLORS.BLUE_SECONDARY : '#f4f3f4'}
                                                    ios_backgroundColor="#3e3e3e"
                                                    onValueChange={() => {
                                                        toggleSwitch()
                                                        handleOnChangeSwitch(event)
                                                    }}
                                                    value={isEnabled}
                                                />
                                                <S.ActiveNotification>notificação ativa</S.ActiveNotification>
                                            </S.ConfirmSpace>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
});