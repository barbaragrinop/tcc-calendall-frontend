
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useHttpCommon } from "@/hooks";
import { Alert } from "react-native";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types";
import { router, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const [session, setSession] = useState<User | null>(null);
    const { api } = useHttpCommon(session?.token);
    const [isLoading, setIsLoading] = useState(true);

    async function signIn(email: string, password: string) {

        if (!email || !password) return

        try {
            setIsLoading(true);
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
            await AsyncStorage.setItem("session", JSON.stringify(userData));

            router.dismissAll()
            router.navigate("/(auth)/(tabs)");

            setIsLoading(false);
        }
        catch (ex: any) {
            setIsLoading(false);
            Alert.alert("Algo deu errado! Tente novamente mais tarde.");
        }
    }

    async function signOut() {
        try {
            setSession(null);
            await AsyncStorage.removeItem("session");
            // @ts-ignore
            router.replace("login");
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