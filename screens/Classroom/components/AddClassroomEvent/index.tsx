import * as S from './style'
import Collapsible from 'react-native-collapsible';

import { useHttpCommon, useYup } from "@/hooks";
import { Alert, Pressable, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Priority } from "@/types";
import { Button, CustomNotification, Input, RequiredSymbol } from "@/components";
import { format, parseISO, subHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { COLORS } from "@/constants";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-native-element-dropdown";
import { ErrorMessage } from '@/components/FormErrorMessage';
import { useFetchClassroomEventsbyClassroomId } from '../../hooks/useFetchClassroomEventsbyClassroomId';

type FormValues = {
    titulo: string,
    descricao: string,
    dt_evento: string
}

export function AddClassroomEvent({ idClassroom }: { idClassroom: number }) {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const { api } = useHttpCommon()
    const { mutate } = useFetchClassroomEventsbyClassroomId(idClassroom)

    const { resolver } = useYup<FormValues>((yup) => {
        return yup.object().shape({
            titulo: yup.string().required("Campo obrigatório"),
            descricao: yup.string().required("Campo obrigatório"),
            dt_evento: yup.string().required("Campo obrigatório")
        })
    })

    const { control, watch, reset, formState: { isSubmitting, isValid } } = useForm<FormValues>({
        resolver,
        defaultValues: {
            titulo: "",
            descricao: "",
            dt_evento: ""
        }
    })
    

    async function handleSubmitEvent() {
        if(!idClassroom) return

        try {
            await api({
                method: 'POST',
                url: `/eventoSala/${idClassroom}/criarEvento`,
                data: {
                    titulo: watch("titulo"),
                    descricao: watch("descricao"),
                    dt_evento: watch("dt_evento"),
                }
            })
            Alert.alert('Sucesso!', 'Evento criado com sucesso!')
            reset()
            setIsCollapsed(true)
            mutate()
        } catch (error: any) {
            Alert.alert('Erro!', 'Ocorreu um erro ao criar o evento!')
        }
    }

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
                        name="titulo"
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                            <View>
                                <Input.Text
                                    required
                                    placeholder="Ex.: Prova de Matemática"
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
                        name="dt_evento"
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
                                    onChange={value => onChange(value)}
                                    onChangeText={value => onChange(value)}
                                    value={value ? format(new Date(value), "dd/MM/yyyy - HH:mm", { locale: ptBR }) : ""}
                                    getCurrentDate={(date) => onChange(date ? date.toISOString() : "")}
                                />
                                <ErrorMessage error={error?.message} />
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name="descricao"
                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                            <View>
                                <Input.TextArea
                                    onBlur={onBlur}
                                    required
                                    placeholder="Ex.: conteudo: derivadas, integral, limites"
                                    label="Descrição"
                                    onChangeText={onChange}
                                    value={value}
                                    type="gray"
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