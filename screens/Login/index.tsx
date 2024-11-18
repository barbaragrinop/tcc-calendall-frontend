import * as S from "./styles";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Input, LogoText } from "@/components";
import { Link, router } from "expo-router";
import { useSession } from "@/app/contexts";
import { ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function LoginScreen() {

    const { signIn, session } = useSession();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        if (session) router.replace("/(auth)/(tabs)");
    }, [session])


    useEffect(() => {
        const removeSession = async () => {
            await AsyncStorage.removeItem("session");
        };
        removeSession();
    }, [])

    return (
        <S.Container>
            <S.Background>
                <S.Header>
                    <S.ImageLogo
                        source={require("@/assets/images/logo-calendall.png")}
                        style={{ width: 150, height: 150 }}
                    />
                    <S.TextContainer>
                        <S.TextTop>
                            <LogoText size={40} />
                        </S.TextTop>
                        <S.TextBottom>gerenciador acadêmico</S.TextBottom>
                    </S.TextContainer>
                </S.Header>
                <S.HR />
                <ScrollView>
                    <S.Form>
                        <S.Title>Entre com a sua conta</S.Title>
                        <Input.Email
                            label="e-mail"
                            value={email}
                            placeholder="Digite seu email"
                            onChangeText={(e) => setEmail(e)}
                        />

                        <Input.Password
                            label="senha"
                            value={password}
                            placeholder="**********"
                            onChangeText={(e) => setPassword(e)}
                        />
                        <TouchableOpacity onPress={() => signIn(email, password)}>
                            <S.Button>
                                <S.ButtonText>entrar</S.ButtonText>
                            </S.Button>
                        </TouchableOpacity>
                    </S.Form>
                    <S.CadastroContainer>
                        <S.TextCadastro>ainda não é cadastrado?</S.TextCadastro>
                        <Link href="/register-user">
                            <S.CadastreSeLink>
                                cadastre-se
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    style={{ color: "#fff" }}
                                />
                            </S.CadastreSeLink>
                        </Link>
                    </S.CadastroContainer>
                </ScrollView>
            </S.Background>
        </S.Container>
    );
}
