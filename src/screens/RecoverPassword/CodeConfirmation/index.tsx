import React from "react";
import * as S from "./style";

import { Text } from "react-native";
import { Button, Header, Input, RequiredSymbol } from "../../../components";
import { useNavigation } from "@react-navigation/native";

export function CodeConfirmation() {
    const navigation = useNavigation();

    return (
        <S.Container>
            <Header title="Recuperar Senha" />
            <S.Form>
                <S.FormTitle>
                    Digite o seu e-mail para enviarmos o código de recuperação.
                </S.FormTitle>
                <S.FieldForms>
                    <Input label="e-mail" required />
                    <S.ButtonSpace>
                        <Button
                            title="cancelar"
                            color="light"
                            onPress={() => navigation.goBack()}
                        />
                        <Button title="cadastrar" color="dark" />
                    </S.ButtonSpace>
                </S.FieldForms>
            </S.Form>
        </S.Container>
    );
}
