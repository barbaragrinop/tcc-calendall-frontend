import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL
})

export function useHttpCommon() {

    // client.interceptors.request.use((config) => {
    //     const token = localStorage.getItem("token")

    //     if (token && config.headers) {
    //         config.headers.Authorization = `Bearer ${token}`
    //     }

    //     return config
    // })

    async function api<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return client(config)
    }

    return {
        client,
        api
    }

}