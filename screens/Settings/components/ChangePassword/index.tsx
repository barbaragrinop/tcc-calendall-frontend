import * as S from "./style";
import { useSession } from "@/app/contexts";
import { Button, Input } from "@/components";
import { ErrorMessage } from "@/components/FormErrorMessage";
import { useYup } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import { View, Text } from "react-native";

type FormValues = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export function ChangePassword() {
    const { session } = useSession();
    
    const { resolver } = useYup<FormValues>((yup) => {
        return yup.object().shape({
            currentPassword: yup.string().required("Senha atual é obrigatória"),
            newPassword: yup.string().required("A senha é obrigatória"),
            confirmPassword: yup.string().required("A confirmação de senha é obrigatória")
                .oneOf([yup.ref("password"), ""], "As senhas não coincidem")
        })
    })

    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: resolver,
        mode: "all"
    });

    // const onSubmit = async (data: FormValues) => {
    //     try {
    //         await api.put(`/users/${user.id}`, {
    //             ...data
    //         });

    //         addToast({
    //             type: "success",
    //             title: "Senha alterada com sucesso",
    //             description: "Sua senha foi alterada com sucesso"
    //         });
    //     } catch (error) {
    //         addToast({
    //             type: "error",
    //             title: "Erro ao alterar senha",
    //             description: "Ocorreu um erro ao alterar sua senha, tente novamente"
    //         });
    //     }
    // }

    return (

        <View>
            <Text>Alterar senha</Text>
            <S.CollapseBody>
                <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                        <>
                            <Input.Text
                                label="Senha atual"
                                placeholder="Digite sua senha atual"
                                secureTextEntry
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                type="gray"
                            />
                            <ErrorMessage error={error?.message} />

                        </>
                    )}
                    name="currentPassword"
                    rules={{ required: "Senha atual é obrigatória" }}
                />

                <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (

                        <Input.Text
                            label="Nova senha"
                            placeholder="Digite sua nova senha"
                            onBlur={onBlur}
                            secureTextEntry
                            onChangeText={onChange}
                            value={value}
                            type="gray"
                        />
                    )}
                    name="newPassword"
                    rules={{ required: "Nova senha é obrigatória" }}
                />

                <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (

                        <Input.Text
                            label="Confirmar nova senha"
                            placeholder="Confirme sua nova senha"
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            type="gray"
                        />
                    )}
                    name="confirmPassword"
                    rules={{ required: "Confirmação de senha é obrigatória" }}
                />

                <S.ButtonSpace>
                    <Button.White
                        title="Salvar"
                    // onPress={handleSubmit(onSubmit)}
                    />
                    <Button.Common
                        title="Cancelar"
                        color="dark"
                    // onPress={handleSubmit(onSubmit)}
                    />
                </S.ButtonSpace>
            </S.CollapseBody>
        </View>
    );

}