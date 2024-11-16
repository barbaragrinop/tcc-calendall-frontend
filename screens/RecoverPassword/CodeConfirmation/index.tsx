import React from "react";
import * as S from "./style";

import { Text } from "react-native";
import { Button, Header, Input, RequiredSymbol } from "@/components";
import { router } from "expo-router";

type RouteParams = {
    email: string;
};

export function CodeConfirmationScreen() {
    // const route = useRoute();

    // const { email } = route.params as RouteParams;

    return (
        <S.Container>
            <Header.BackButton title="Recuperação de Senha" />

            <S.Form>
                <S.FormTitle>
                    Digite o código que enviamos para seguinte e-mail:
                </S.FormTitle>
                <S.FieldForms>
                    <Input.Text
                        label=""
                        editable={false}
                        selectTextOnFocus={false}
                        value={"email"}
                        defaultValue={"email"}
                        isDisabled
                    />
                    <Input.Text label="Código enviado" required />
                    <S.ButtonSpace>
                        <Button.Common
                            title="confirmar"
                            color="dark"
                            onPress={() => 
                                router.navigate("/recover-password/change-password")
                            }
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
