import * as S from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Alert, Pressable, Text, View } from "react-native";
import { Button, Header, Input, RequiredSymbol } from "@/components";
import { useHttpCommon, useYup } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/FormErrorMessage";
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

type FormValues = {
    name: string;
    email: string;
    birthDate: string;
    password: string;
    confirmPassword: string;
}

export function RegisterUserScreen() {
    const navigation = useNavigation();
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

    const { api } = useHttpCommon()

    const { resolver } = useYup<FormValues>((yup) => {
        return yup.object().shape({
            name: yup.string().required("O nome é obrigatório"),
            email: yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
            birthDate: yup.string().required("A data de nascimento é obrigatória"),
            password: yup.string().required("A senha é obrigatória"),
            confirmPassword: yup.string().required("A confirmação de senha é obrigatória")
                .oneOf([yup.ref("password"), ""], "As senhas não coincidem")
        })
    })


    const { control, watch, formState: { isValid, isSubmitting }, handleSubmit } = useForm<FormValues>({
        resolver,
        mode: "all"
    })

    function toggleDatePicker() {
        setShowDatePicker(!showDatePicker)
    }

    async function onSubmit() {
        console.log('onSubmit')
        try {
            await api({
                url: "/autenticacao/cadastro",
                method: "POST",
                data: {
                    nome: watch("name"),
                    email: watch("email"),
                    dataNascimento: watch("birthDate"),
                    senha: watch("password"),
                    confirmacaoSenha: watch("confirmPassword")
                }
            })

            navigation.navigate("index")
        } catch (ex) {
            console.error('ex', ex)

            if (ex instanceof Error) {
                console.error('Mensagem do erro:', ex.message);
                console.error('Stack do erro:', ex.stack);
            } else {
                // Caso o erro não seja uma instância de Error, exibe o erro como está
                console.error('Erro desconhecido:', ex);
            }

            Alert.alert("Erro ao cadastrar usuário");
        }
    }

    console.log("watch date", watch("birthDate"))

    return (
        <S.Container>
            <Header.BackButton title="Cadastro de Usuário" />
            <S.Form>
                <S.FormTitle>
                    Caso deseje se cadastrar, insira seus dados nos campos
                    abaixo:
                </S.FormTitle>
                <S.FieldForms>
                    <Controller
                        control={control}
                        name="name"
                        render={({
                            field: { onBlur, name, onChange, value }, fieldState: { error } }) => (
                            <View>
                                <Input.Text
                                    label="nome"
                                    required
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                <ErrorMessage error={error?.message} />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onBlur, name,
                            onChange,
                            value
                        }, fieldState: { error } }) => (
                            <View>
                                <Input.Email
                                    label="e-mail"
                                    required
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />

                                <ErrorMessage error={error?.message} />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="birthDate"
                        render={({ field: { onBlur, name,
                            onChange,
                            value
                        }, fieldState: { error } }) => (
                            <View>
                                <Input.DatePicker
                                    label="data de nascimento"
                                    required
                                    editable={false}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    onChange={value => onChange(value)}         
                                    value={value ? format(new Date(value), "dd MMMM yyyy", { locale: ptBR }) : ""}
                                    getCurrentDate={(date) => onChange(date ? date.toISOString() : "")}
                                />
                                <ErrorMessage error={error?.message} />

                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onBlur, name,
                            onChange,
                            value
                        }, fieldState: { error } }) => (
                            <View>
                                <Input.Password
                                    label="senha"
                                    required
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                <ErrorMessage error={error?.message} />
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onBlur, name,
                            onChange,
                            value
                        }, fieldState: { error } }) => (
                            <View>
                                <Input.Password
                                    label="confirmação de senha"
                                    required
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                />
                                <ErrorMessage error={error?.message} />
                            </View>

                        )}
                    />
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

                        // disabled={!isValid || isSubmitting}
                        color="dark"
                        onPress={handleSubmit(onSubmit)}
                    />
                </S.ButtonSpace>
            </S.Form>
        </S.Container>
    );
}
