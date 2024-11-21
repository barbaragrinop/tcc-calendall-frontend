import * as S from './style'

import { Button } from "@/components/Button";
import { CustomNotification } from '@/components/CustomNotification';
import { ErrorMessage } from '@/components/FormErrorMessage';
import { Input } from '@/components/Input';
import { Modal } from "@/components/Modal";
import { RequiredSymbol } from '@/components/RequiredSymbol';
import { COLORS } from '@/constants';
import { useHttpCommon, useYup } from "@/hooks";
import { usePersonalCalendarService } from "@/screens/Home/hooks/usePersonalCalendarService";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';


type FormValues = {
    title: string;
    description: string;
    datetime: string;
    notificationType: string;
    priority: string;
}


export function AddEventToPersonalCalendar({
    title,
    description,
    datetime,
}: Omit<FormValues, "notificationType" | "priority">) {
    console.log('datetime', datetime)
    const [toggleModal, setToggleModal] = useState<boolean>(false);

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
            title: title,
            description: description,
            datetime: datetime,
            notificationType: "",
            priority: "",
        }
    })


    function handleOpen() {
        setToggleModal(true);
    }

    function handleClose() {
        setToggleModal(false);
    }

    async function handleAddToPersonalCalendar() {
        console.log('handleAddToPersonalCalendar', 'clicou')
    }

    const watchNotificationsType = watch("notificationType");

    return (
        <ScrollView>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingTop: 40
                }}

            >
                <Button.LightBlue title="adicionar ao calendário pessoal" onPress={handleOpen} />

                <Modal closeModal={handleClose} visible={toggleModal} title='Adicionar evento - Pessoal'>
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
                                        label="Data do evento"
                                        placeholder="Escolha uma data e horário"
                                        mode="date"
                                        textColor="dark"
                                        type="gray"
                                        required
                                        editable={false}
                                        onBlur={onBlur}
                                        onChange={value => onChange(value)}
                                        onChangeText={value => onChange(value)}
                                        value={value ? format(new Date(value), "dd/MM/yyyy", { locale: ptBR }) : ""}
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
                                            { label: "Baixa", value: "BAIXA" },
                                            { label: "Média", value: "MEDIA" },
                                            { label: "Alta", value: "ALTA" },
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
                                    handleClose()
                                }}
                            />
                            <Button.Common
                                onPress={handleAddToPersonalCalendar}
                                color="dark"
                                title="salvar"
                                style={{ width: "45%" }}
                                disabled={isSubmitting || !isValid}
                            />
                        </S.ButtonSpace>
                    </S.CollapseBody>
                </Modal>
            </View>
        </ScrollView>
    )
}