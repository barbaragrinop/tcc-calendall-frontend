import React from "react";
import * as S from "./style";

import { Text } from "react-native";
import { Button, Header, Input, RequiredSymbol } from "../../../components";
import { useNavigation, useRoute } from "@react-navigation/native";

type RouteParams = {
    email: string;
};

export function ChangePassword() {
    const navigation = useNavigation();

    return (
        <S.Container>
            <Header title="Recuperação de Senha" />
            <S.Form>
                <S.FormTitle>Digite sua nova senha</S.FormTitle>
                <S.FieldForms>
                    <Input
                        label="senha"
                        required
                    />
                    <Input
                        label="confirmação de senha"
                        required
                    />
                    <S.ButtonSpace>
                        <Button
                            title="alterar"
                            color="dark"
                            onPress={() => navigation.navigate("Login")}
                        />
                        <Button
                            title="cancelar"
                            color="light"
                            onPress={() => navigation.navigate("Login")}
                        />
                    </S.ButtonSpace>
                </S.FieldForms>
            </S.Form>
        </S.Container>
    );
}
