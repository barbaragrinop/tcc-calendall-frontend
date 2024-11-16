import React from "react";
import * as S from "./style";

import { Button, Header, Input } from "@/components";
import { router } from "expo-router";

export function ChangePasswordScreen() {

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
                            onPress={() => router.navigate("/")}
                        />
                        <Button
                            title="cancelar"
                            color="light"
                            onPress={() => router.navigate("/")}
                        />
                    </S.ButtonSpace>
                </S.FieldForms>
            </S.Form>
        </S.Container>
    );
}
