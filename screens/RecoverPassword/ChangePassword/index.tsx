import React from "react";
import * as S from "./style";

import { Button, Header, Input } from "@/components";
import { useNavigation } from "@react-navigation/native";

export function ChangePasswordScreen() {
    const navigation = useNavigation();

    return (
        <S.Container>
            <Header.BackButton title="Recuperação de Senha" />
            <S.Form>
                <S.FormTitle>Digite sua nova senha</S.FormTitle>
                <S.FieldForms>
                    <Input.Password
                        label="senha"
                        required
                    />
                    <Input.Password
                        label="confirmação de senha"
                        required
                    />
                    <S.ButtonSpace>
                        <Button
                            title="alterar"
                            color="dark"
                            onPress={() => navigation.navigate("index")}
                        />
                        <Button
                            title="cancelar"
                            color="light"
                            onPress={() => navigation.navigate("index")}
                        />
                    </S.ButtonSpace>
                </S.FieldForms>
            </S.Form>
        </S.Container>
    );
}
