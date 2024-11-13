import React, { useState } from "react";
import * as S from "./style";

import { Text } from "react-native";
import { Button, Header, Input } from "@/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function RecoverPassword() {
    const navigation = useNavigation();
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
                        <Button
                            title="prosseguir"
                            color="dark"
                            onPress={() =>
                                navigation.navigate("code-confirmation", {
                                    email,
                                })
                            }
                        />
                        <Button
                            title="cancelar"
                            color="light"
                            onPress={() => navigation.goBack()}
                        />
                    </S.ButtonSpace>
                </S.FieldForms>
            </S.Form>
        </S.Container>
    );
}
