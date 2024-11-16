import React, { useState } from "react";
import * as S from "./style";

import { Button, Header, Input } from "@/components";
import { router } from "expo-router";

export function RecoverPasswordScreen() {
    const [email, setEmail] = useState("");

    return (
        <S.Container>
            <Header.BackButton title="Recuperar Senha" />
            <S.Form>
                <S.FormTitle>
                    Digite o seu e-mail para enviarmos o código de recuperação.
                </S.FormTitle>
                <S.FieldForms>
                    <Input.Email
                        label="e-mail"
                        required
                        onChangeText={(newText) => setEmail(newText)}
                    />
                    <S.ButtonSpace>
                        <Button.Common
                            title="prosseguir"
                            color="dark"
                            onPress={() => router.navigate("/recover-password/confirmation-code")}
                        />
                        <Button.Common
                            title="cancelar"
                            color="light"
                            onPress={router.back}
                        />
                    </S.ButtonSpace>
                </S.FieldForms>
            </S.Form>
        </S.Container>
    );
}
