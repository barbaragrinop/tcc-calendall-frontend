import { useContext, createContext, useEffect, useState, ReactNode } from 'react'
import axios, { AxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'
import { useHttpCommon } from '@/hooks';

type AuthState = {
    token: string | null;
    authenticated: boolean | null;
}

type UserDataRegister = {
    email: string;
    password: string;
    birthDate: string;
    name: string;
}
type Props = {
    authState?: AuthState;
    onRegister?: ({ birthDate, email, name, password }: UserDataRegister) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>
}

const AuthContext = createContext<Props>({})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {

    const [authState, setAuthState] = useState<AuthState>({ token: null, authenticated: null })

    const { api, client } = useHttpCommon()

    useEffect(() => {
        async function loadToken() {
            const token = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_NATIVE_TOKEN_KEY!)
            console.log('loadToken token', token)

            if (token) {
                setAuthState({ token, authenticated: true })
                client.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }
        }
    }, [])

    async function onRegister(props: UserDataRegister) {
        try {
            await api({
                url: '/autenticacao/cadastro',
                method: "POST",
                data: props
            })
        } catch (ex: any) {
            console.log('onRegister ewrror', ex)
        }
    }

    async function onLogin(email: string, password: string) {
        try {
            const response = await api<{ token: string }>({
                url: '/autenticacao/login',
                method: "POST",
                data: { email, senha: password }
            })
            console.log('response', response)

            setAuthState({
                token: response.data.token,
                authenticated: true
            })

            client.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_NATIVE_TOKEN_KEY!, response.data.token)

            return response
            // await SecureStore.setItemAsync('token', response.data.token)
            // setAuthState({ token: response.data.token, authenticarted: true })
        } catch (ex: any) {
            console.log('onLogin error', ex)
        }
    }

    async function onLogout() {
        try {
            await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_NATIVE_TOKEN_KEY!)
            setAuthState({ token: null, authenticated: false })
            client.defaults.headers.common['Authorization'] = ''
        } catch (ex: any) {
            console.log('onLogout error', ex)
        }
    }

    const value = {
        onRegister,
        onLogin,
        onLogout,
    }
    // return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}