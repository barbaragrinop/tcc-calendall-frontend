import { Pressable, TextInputProps, View, Platform } from "react-native";
import * as S from "./style";
import React, { ReactElement, useState } from "react";
import { RequiredSymbol } from "../RequiredSymbol";
import { COLORS } from "@/constants";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

type Props = TextInputProps & {
    required?: boolean;
    label?: string;
    isDisabled?: boolean;
    icon?: ReactElement;
};

function InputText({
    label,
    required = false,
    placeholder,
    isDisabled = false,
    icon,
    ...props
}: Props) {

    if (icon) {
        return (
            <S.Container>
                <S.Label>
                    {required && <RequiredSymbol />} {label}
                </S.Label>
                <S.ContainerInput>
                    <S.IconSpace>
                        {icon}
                    </S.IconSpace>
                    <S.TextInput isDisabled={isDisabled} placeholder={placeholder} hasIcon={icon} {...props} placeholderTextColor={COLORS.GREY_LIGHT} />
                </S.ContainerInput>
            </S.Container>
        );
    }

    return (
        <S.Container>
            <S.Label>
                {required && <RequiredSymbol />} {label}
            </S.Label>
            <S.TextInput isDisabled={isDisabled} {...props} />
        </S.Container>
    );
}

function InputPassword(props: Props) {
    return <InputText {...props} secureTextEntry  />;
}

function InputEmail(props: Props) {
    return <InputText {...props} keyboardType="email-address" />;
}

function InputNumber(props: Props) {
    return <InputText {...props} keyboardType="number-pad" />;
}

type InputDatePickerProps = Props & {
    getCurrentDate: (date: Date | undefined) => void
}

function InputDatePicker(props: InputDatePickerProps) {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [date, setDate] = useState<Date | undefined>(props.value ? new Date(props.value) : undefined)
    const [chosenDate, setChosenDate] = useState<string>("")

    function onChange({ type }: DateTimePickerEvent, selectedDate: Date | undefined) {

        if (type === "set") {
            const currentDate = selectedDate

            if (!currentDate) return

            const normalizedDate = new Date(selectedDate);
            normalizedDate.setHours(0, 0, 0, 0);  
            setDate(normalizedDate);
            props.getCurrentDate(normalizedDate);

            if (Platform.OS === "android") {
                toggleDatePicker()
                setChosenDate(currentDate.toDateString())
            }

            return
        }

        toggleDatePicker()
    }

    function toggleDatePicker() {
        console.log('showDatePicker', showDatePicker)
        setShowDatePicker(!showDatePicker)
    }

    return (
        <View>
            <Pressable
                onPress={toggleDatePicker}
            >
                <View style={{ position: 'relative' }}>
                    <InputText
                        value={chosenDate ?
                            format(new Date(chosenDate), "dd MMMM yyyy", { locale: ptBR })
                            : ""}
                        onChangeText={setChosenDate}
                        editable={false}
                        onPressIn={toggleDatePicker}
                        {...props}
                        style={{
                            paddingRight: 30,
                            paddingLeft: 10,
                            fontSize: 16,
                            height: 45,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faCalendar}
                        size={20}
                        color={COLORS.BLUE_TERTIARY}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            bottom: '50%',
                            transform: [{ translateY: 1 }],
                        }}
                    />
                </View>
            </Pressable>
            {
                showDatePicker && (
                    <DateTimePicker
                        mode="date"
                        display="spinner"
                        is24Hour={true}
                        locale="pt-BR"
                        value={date ? new Date(date) : new Date()}
                        onChange={onChange}
                    />
                )
            }
        </View>
    )
}

export const Input = {
    Text: InputText,
    Password: InputPassword,
    Email: InputEmail,
    Number: InputNumber,
    DatePicker: InputDatePicker
}