
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useHttpCommon, useSecureStoreManagement } from "@/hooks";
import { Alert } from "react-native";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types";
import { router } from "expo-router";

type AuthResponse = {
    nome: string;
    dataNascimento: string;
    email: string;
    id: number
}

const AuthContext = createContext<{
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    session?: User | null;
    isLoading: boolean;
}>({
    signIn: (email: string, password: string) => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    return value;
}

export default function SessionProvider(props: PropsWithChildren) {

    const { api, client } = useHttpCommon();
    const { useStorageState } = useSecureStoreManagement();
    const [[isLoading, session], setSession] = useStorageState<User | null>("session");

    async function signIn(email: string, password: string) {
        if (session) router.navigate("/(auth)/(tabs)"); // Se já estiver logado, redireciona para a tela principal

        if (!email || !password) return

        try {
            const { data: { token } } = await api<{ token: string }>({
                url: "/autenticacao/login",
                method: "POST",
                data: { email, senha: password }
            });

            const decodedToken: AuthResponse = jwtDecode(token);

            if (!token) throw new Error("Algo deu errado! Tente novamente mais tarde.");

            const userData: User = {
                nome: decodedToken.nome,
                birthDate: decodedToken.dataNascimento,
                email: decodedToken.email,
                token,
                id: decodedToken.id,
            }

            setSession(userData);

            router.navigate("/(auth)/(tabs)");

            Alert.alert(JSON.stringify(decodedToken));
        }
        catch (ex: any) {
            Alert.alert("Algo deu errado! Tente novamente mais tarde.");
        }
    }

    async function signOut() {

        try {
            setSession(null); 
            router.replace("/"); 
        } catch (err) {
            console.error("Erro no logout:", err);
        }

    }
    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                session,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}