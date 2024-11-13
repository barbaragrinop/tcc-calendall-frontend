import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import * as SecureStore from 'expo-secure-store'

const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL
})

export function useHttpCommon() {

    client.interceptors.request.use(async (config) => {
        const token = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_NATIVE_TOKEN_KEY!)

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    })

    async function api<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return client(config)
    }

    return {
        client,
        api
    }

}