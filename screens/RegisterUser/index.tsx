import * as S from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { Button, Header, Input, RequiredSymbol } from "@/components";

export function RegisterUserScreen() {
    const navigation = useNavigation();

    return (
        <S.Container>
            <Header.BackButton title="Cadastro de Usuário" />
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
                        onPress={() => navigation.navigate("terms-of-use")}
                        style={{
                            fontWeight: "bold",
                            textDecorationLine: "underline",
                        }}
                    >
                        Termos de Uso
                    </Text>
                    {" e "}
                    <Text
                        onPress={() => navigation.navigate("privacy-policy")}
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
                    <Button
                        title="cadastrar"
                        color="dark"
                        onPress={() => navigation.navigate("index")}
                    />
                </S.ButtonSpace>
            </S.Form>
        </S.Container>
    );
}
