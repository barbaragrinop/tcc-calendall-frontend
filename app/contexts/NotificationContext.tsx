import * as Notifications from "expo-notifications";
import { EventSubscription } from "expo-modules-core"

import { createContext, ReactNode, useEffect, useState, useContext, FC, useRef } from "react";
import { registerForPushNotificationsAsync } from "@/utils/register-for-push-notifications-async";
import { useHttpCommon } from "@/hooks";
import { AxiosResponse } from "axios";

interface NotificationContextType {
    expoPushToken: string | null;
    notification: Notifications.Notification | null;
    error: Error | null;
    sendCustomPushNotification: () => Promise<AxiosResponse<unknown, any>>
}

const NotificationContext =
    createContext<NotificationContextType | undefined>(undefined);

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification deve estar dentro de NotificationProvider');
    }
    return context;
}

type Props = {
    children: ReactNode;
}

type PropsMessage = {
    to: string;
    sound: string;
    title: string;
    body: string;
    data: {
        customData: string;
    };
}

export function NotificationProvider({ children }: Props) {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const [notification, setNotification] = useState<Notifications.Notification | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const { api } = useHttpCommon()

    const notificationListener = useRef<EventSubscription>();
    const responseListener = useRef<EventSubscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(
            (token) => setExpoPushToken(token),
            (error) => setError(error)
        )


        // adiciona um listener para notificações recebidas, vai ser chamando 
        // toda vez que uma notificação for recebida enquanto o app estiver ABERTO
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                console.log('Notificação recebida: ', notification)
                setNotification(notification)
            })

        // adiciona um listener para respostas de notificações, vai ser chamando    
        // toda vez que o usuário CLICAR na notificação
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log('Resposta de notificação recebida: ',
                    JSON.stringify(response, null, 2),
                    JSON.stringify(response.notification.request.content.data, null, 2)
                )
            })


        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(
                    notificationListener.current
                )
            }

            if (responseListener.current) {
                Notifications.removeNotificationSubscription(
                    responseListener.current
                )
            }
        }

    }, [])

    async function sendCustomPushNotification() {
        if (!expoPushToken) throw new Error("Token não encontrado!");

        const message = {
            to: expoPushToken,
            sound: "default",
            title: "Título da Notificação",
            body: "Aqui está sua mensagem!",
            data: { customData: "Qualquer dado adicional" },
        };

        try {

            let response = await api({
                url: "https://exp.host/--/api/v2/push/send",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(message),
            })

            console.log('response', response)
            return response
        } catch (error: any) {
            throw new Error("Erro ao enviar notificação!");
        }
    };

    return (
        <NotificationContext.Provider
            value={{ expoPushToken, notification, error, sendCustomPushNotification }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

