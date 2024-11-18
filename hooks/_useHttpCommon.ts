import { useSession } from "@/app/contexts"
import { User } from "@/types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useEffect, useState } from "react"

const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL
})

export function useHttpCommon() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const getTokenFromStorage = async () => {
            const storedToken = await AsyncStorage.getItem("session");
            setToken(storedToken); 
        };

        getTokenFromStorage();
    }, []); 
    
    useEffect(() => {
        if (token) {
            client.interceptors.request.use((config) => {
                if (config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            });
        }
    }, [token]);  

    async function api<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const response = await client(config);
        return response; 
    }
    
    async function fetcher<T>(url: string, params?: AxiosRequestConfig['params']): Promise<T> {
        const { data } = await client.get<T>(url, { params })
        return data
    }

    return {
        client,
        api,
        fetcher, 
        setToken
    }

}