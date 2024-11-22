import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {

    // pra enviar noficiação, precisa configurar um canal
    // o nome do canal é default (customizável)
    // varios podem ser criados
    // a importancia tem que ser max para aparecer em todos os dispositivos
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        })
    }

    if (Device.isDevice) { // se for um dispositivo físico
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync() // verifica se já tem permissão

        let finalStatus = existingStatus // se já tem permissão, mantém

        if (existingStatus !== 'granted') { // se não tem permissão, pede
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }

        if (finalStatus !== 'granted') { // se não foi possível obter permissão, lança um erro
            throw new Error('Não foi possível obter permissão e token para enviar notificações')
        }

        const projectId = Constants?.expoConfig?.extra?.eas?.projectId
            ?? Constants?.easConfig?.projectId

        if (!projectId) {
            throw new Error('ProjectId não encontrado!')
        }

        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({ // pega o token
                    projectId
                })).data

            return pushTokenString
        } catch (error) {
            throw new Error(`${error}`)
        }
    } else {
        throw new Error('Precisa ser um dispositivo físico!')
    }
}