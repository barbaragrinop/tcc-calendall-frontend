import { useSession } from "@/app/contexts"
import { User } from "@/types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useEffect, useState } from "react"

const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL
})

export function useHttpCommon(token?: string) {

    useEffect(() => {
        if (!token) return

        client.interceptors.request.use(async (config) => {


            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`
            } else {
                delete config.headers.Authorization
            }

            return config

        })
    }, [client, token])

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