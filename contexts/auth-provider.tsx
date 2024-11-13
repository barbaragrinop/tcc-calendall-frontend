import * as SecureStore from 'expo-secure-store'
import { useContext, createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { useHttpCommon } from '@/hooks';

type AuthContextProps = {
    // signIn: () => void;
    // signOut: () => void;
    // session?: string | null;
    // isLoading: boolean;
}

type AuthState = {
    token: string | null;
    authenticated: boolean | null;
}

const AuthContext = createContext<AuthContextProps>({
    // signIn: () => null,
    // signOut: () => null,
    // session: null,
    // isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [authState, setAuthState] = useState<AuthState>({ token: null, authenticated: null })
    const { api, client } = useHttpCommon()

    async function onLogin(email: string, password: string) {
        try {
            const response = await api<{ token: string }>({
                url: '/autenticacao/login',
                method: "POST",
                data: { email, senha: password }
            })

            console.log('response', response)
            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_NATIVE_TOKEN_KEY!, response.data.token)

            client.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`


            // return response
            // // await SecureStore.setItemAsync('token', response.data.token)
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


    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
}