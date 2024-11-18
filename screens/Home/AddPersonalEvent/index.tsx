import * as S from './style'
import Collapsible from 'react-native-collapsible';

import { useHttpCommon, useYup } from "@/hooks";
import { Alert, Pressable, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Priority } from "@/types";
import { Button, CustomNotification, Input, RequiredSymbol } from "@/components";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { COLORS } from "@/constants";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-native-element-dropdown";
import { ErrorMessage } from '@/components/FormErrorMessage';
import { usePersonalCalendarService } from '../hooks/usePersonalCalendarService';

type FormValues = {
    title: string;
    description: string;
    datetime: string;
    notificationType: string;
    priority: string;
}

// export function AddPersonalEvent(props?: FormValues) {
export function AddPersonalEvent() {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const { api } = useHttpCommon()
    const { mutate } = usePersonalCalendarService()

    const { resolver } = useYup<FormValues>((yup) => {
        return yup.object().shape({
            title: yup.string().required(),
            description: yup.string().required(),
            datetime: yup.string().required(),
            notificationType: yup.string().required(),
            priority: yup.string().required(),
        })
    })

    const { control, watch, reset, formState: { isSubmitting, isValid } } = useForm<FormValues>({
        resolver,
        defaultValues: {
            title: "",
            description: "",
            datetime: "",
            notificationType: "",
            priority: "",
        }
    })

    async function handleSubmitEvent() {
        try {
            const response = await api({
                method: 'POST',
                url: '/eventoPessoal/criarEventoPessoal',
                data: {
                    tipoPrioridade: watch("priority"),
                    tipoNotificacao: watch("notificationType"),
                    titulo: watch("title"),
                    descricao: watch("description"),
                    dt_evento: format(new Date(watch("datetime")), "yyyy-MM-dd")
                }
            })
            console.log('response', response)
            Alert.alert('Sucesso!', 'Evento criado com sucesso!')
            reset()
            setIsCollapsed(true)
            mutate()
        } catch (error: any) {
            Alert.alert('Erro!', 'Ocorreu um erro ao criar o evento!')
            console.log('error', error.response)
        }
    }

    const watchNotificationsType = watch("notificationType");

    return (
        <>
            <Pressable onPress={() => setIsCollapsed(!isCollapsed)}>
                <S.HeaderCollapse>
                    <S.TitleIconSpace>
                        <FontAwesomeIcon
                            icon={faCalendarPlus}
                            size={25}
                            color={COLORS.GREY_PRIORITY_LOW}
                        />
                        <S.TitleCollapse>Adicionar Evento</S.TitleCollapse>
                    </S.TitleIconSpace>
                    <S.CollapseIconSpace>
                        <FontAwesomeIcon
                            icon={
                                isCollapsed ? faChevronDown : faChevronUp
                            }
                            size={25}
                            color={COLORS.GREY_PRIORITY_LOW}
                        />
                    </S.CollapseIconSpace>
                </S.HeaderCollapse>
            </Pressable>

            <Collapsible collapsed={isCollapsed}>
                <S.CollapseBody>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                            <View>
                                <Input.Text
                                    required
                                    placeholder="Ex.: Reunião com a equipe"
                                    label="Título"
                                    onChangeText={onChange}
                                    value={value}
                                    type="gray"
                                    onBlur={onBlur}
                                />
                                <ErrorMessage error={error?.message} />
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                            <View>
                                <Input.TextArea
                                    onBlur={onBlur}
                                    required
                                    placeholder="Ex.: trabalho em equipe para o projeto X"
                                    label="Descrição"
                                    onChangeText={onChange}
                                    value={value}
                                    type="gray"
                                />
                                <ErrorMessage error={error?.message} />
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name="datetime"
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                            <View>
                                <Input.DatePicker
                                    label="Data/Hora do evento"
                                    placeholder="Escolha uma data e horário"
                                    mode="datetime"
                                    textColor="dark"
                                    type="gray"
                                    required
                                    editable={false}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    onChange={value => onChange(value)}
                                    value={value ? format(new Date(value), "dd/MM/yyyy - HH:mm", { locale: ptBR }) : ""}
                                    getCurrentDate={(date) => onChange(date ? date.toISOString() : "")}
                                />
                                <ErrorMessage error={error?.message} />
                            </View>
                        )}
                    />
                    <S.LabelSpace>
                        <RequiredSymbol />
                        <S.Label type="gray">Tipo de notificação</S.Label>
                    </S.LabelSpace>
                    <Controller
                        control={control}
                        name="notificationType"
                        render={({ field: { onChange, value, onBlur, }, fieldState: { error } }) => (
                            <View>

                                <Dropdown
                                    data={[
                                        { label: "A cada hora", value: "hora" },
                                        { label: "A cada dia", value: "dia" },
                                        { label: "A cada semana", value: "semana" },
                                        { label: "Personalizado", value: "custom" },
                                    ]}
                                    onBlur={onBlur}
                                    style={{
                                        height: 43,
                                        borderColor: COLORS.GREY_PRIORITY_LOW,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        paddingHorizontal: 8,
                                        backgroundColor: 'white',
                                        marginTop: -15,
                                    }}
                                    placeholderStyle={{ color: COLORS.GREY_LIGHT, fontSize: 16 }}
                                    labelField="label"
                                    valueField="value"
                                    value={value}
                                    onChange={({ value }) => onChange(value)}
                                    placeholder="Escolha o tipo..."
                                />
                                <ErrorMessage error={error?.message} />

                            </View>
                        )}
                    />

                    {watchNotificationsType === "custom" && (
                        <S.CustomNotificationSpace>
                            <CustomNotification
                                hours="1"
                                minutes="1"
                                seconds="1"
                                setHours={(value) => console.log(value)}
                                setMinutes={(value) => console.log(value)}
                                setSeconds={(value) => console.log(value)}
                            />
                        </S.CustomNotificationSpace>
                    )}

                    <S.LabelSpace>
                        <RequiredSymbol />
                        <S.Label type="gray">Prioridade</S.Label>
                    </S.LabelSpace>
                    <Controller
                        control={control}
                        name="priority"
                        render={({ field: { onChange, value, onBlur, }, fieldState: { error } }) => (

                            <View>

                                <Dropdown
                                    data={[
                                        { label: "Baixa", value: Priority.BAIXA },
                                        { label: "Média", value: Priority.MEDIA },
                                        { label: "Alta", value: Priority.ALTA },
                                    ]}
                                    style={{
                                        height: 43,
                                        borderColor: COLORS.GREY_PRIORITY_LOW,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        paddingHorizontal: 8,
                                        backgroundColor: 'white',
                                        marginTop: -15,
                                    }}
                                    placeholderStyle={{ color: COLORS.GREY_LIGHT, fontSize: 16 }}
                                    labelField="label"
                                    valueField="value"
                                    value={value}
                                    onChange={({ value }) => onChange(value)}
                                    onBlur={onBlur}
                                    placeholder="Escolha o tipo..."
                                />
                                <ErrorMessage error={error?.message} />
                            </View>
                        )}
                    />
                    <S.ButtonSpace>
                        <Button.Common
                            color="light"
                            title="cancelar"
                            style={{ width: "45%" }}
                            onPress={() => {
                                reset()
                                setIsCollapsed(true)
                            }}
                        />
                        <Button.Common
                            onPress={handleSubmitEvent}
                            color="dark"
                            title="salvar"
                            style={{ width: "45%" }}
                            disabled={isSubmitting || !isValid}
                        />
                    </S.ButtonSpace>
                </S.CollapseBody>
            </Collapsible>
        </>
    )



}