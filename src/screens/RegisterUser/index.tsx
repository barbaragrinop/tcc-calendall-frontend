import * as S from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { Header } from "../../components/Header";
import { Text } from "react-native";
import { RequiredSymbol } from "../../components/RequiredSymbol";
import { Button } from "../../components/Button";

export function RegisterUser() {
    const navigation = useNavigation();

    return (
        <S.Container>
            <Header title="Cadastro de Usuário" />
            <S.Form>
                <S.FormTitle>
                    Caso deseje se cadastrar, insira seus dados nos campos
                    abaixo:
                </S.FormTitle>
                <S.FieldForms>
                    <Input label="nome" required />
                    <Input label="e-mail" required />
                    <Input label="data de nascimento" required />
                    <Input label="senha" required />
                    <Input label="confirmação de senha" required />
                </S.FieldForms>
                <S.RequiredText>
                    <RequiredSymbol />
                    Ao clicar no botão
                    <Text style={{ fontWeight: "bold" }}> cadastrar </Text>
                    você concorda com os{" "}
                    <Text
                        onPress={() => navigation.navigate("TermsOfUse")}
                        style={{
                            fontWeight: "bold",
                            textDecorationLine: "underline",
                        }}
                    >
                        Termos de Uso
                    </Text>
                    {" e "}
                    <Text
                        onPress={() => navigation.navigate("PrivacyPolicy")}
                        style={{
                            fontWeight: "bold",
                            textDecorationLine: "underline",
                        }}
                    >
                        Políticas de Privacidade
                    </Text>
                </S.RequiredText>
                <S.ButtonSpace>
                    <Button
                        title="cancelar"
                        color="light"
                        onPress={() => navigation.goBack()}
                    />
                    <Button title="cadastrar" color="dark" />
                </S.ButtonSpace>
            </S.Form>
        </S.Container>
    );
}
