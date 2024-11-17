import { useSession } from "@/app/contexts"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import * as SecureStore from 'expo-secure-store'
import { useEffect } from "react"

const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL
})

export function useHttpCommon() {
    const { session } = useSession()

    useEffect(() => {
        if (!session) return

        client.interceptors.request.use(async (config) => {

            if (session && session.token && config.headers) {
                config.headers.Authorization = `Bearer ${session.token}`
            } else {
                delete config.headers.Authorization
            }

            return config
            
        })
    }, [session])



    async function api<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return client(config)
    }

    async function fetcher<T>(url: string, params?: AxiosRequestConfig['params']): Promise<T> {
        const { data } = await client.get<T>(url, { params })
        return data
    }

    return {
        client,
        api,
        fetcher
    }

}