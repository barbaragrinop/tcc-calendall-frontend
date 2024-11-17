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
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { Dropdown } from "react-native-element-dropdown";

type Props = TextInputProps & {
    required?: boolean;
    label?: string;
    isDisabled?: boolean;
    icon?: ReactElement;
    type?: "white" | "gray";
};

function InputText({
    label,
    required = false,
    placeholder,
    isDisabled = false,
    icon,
    type = "white",
    ...props
}: Props) {

    if (icon) {
        return (
            <S.Container>
                {label && (
                    <S.LabelSpace>
                        {required && <RequiredSymbol />}
                        <S.Label type={type}>
                            {label}
                        </S.Label>
                    </S.LabelSpace>
                )}
                <S.ContainerInput>
                    <S.IconSpace>
                        {icon}
                    </S.IconSpace>
                    <S.TextInput
                        isDisabled={isDisabled}
                        placeholder={placeholder}
                        hasIcon={icon} {...props}
                        placeholderTextColor={COLORS.GREY_LIGHT}
                        type={type}
                    />
                </S.ContainerInput>
            </S.Container>
        );
    }

    return (
        <S.Container>
            {label && (
                <S.LabelSpace>
                    {required && <RequiredSymbol />}
                    <S.Label type={type}>
                        {label}
                    </S.Label>
                </S.LabelSpace>
            )}
            <S.TextInput
                isDisabled={isDisabled}
                placeholder={placeholder}
                hasIcon={icon} {...props}
                placeholderTextColor={COLORS.GREY_LIGHT}
                type={type}
            />
        </S.Container>
    );
}

function InputPassword(props: Props) {
    return <InputText {...props} secureTextEntry />;
}

function InputEmail(props: Props) {
    return <InputText {...props} keyboardType="email-address" />;
}

function InputNumber(props: Props) {
    return <InputText {...props} keyboardType="number-pad" />;
}

function InputTextArea(props: Props) {
    return <InputText {...props} multiline numberOfLines={3} />;
}

type InputDatePickerProps = Props & {
    getCurrentDate: (date: Date | undefined) => void
    mode: "date" | "time" | "datetime",
    textColor: "dark" | "white",
}

function InputDatePicker(props: InputDatePickerProps) {
    const { mode, textColor } = props
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [date, setDate] = useState<Date | undefined>(props.value ? new Date(props.value) : undefined)
    const [chosenDate, setChosenDate] = useState<string>("")

    function onChange({ type }: DateTimePickerEvent, selectedDate: Date | undefined) {
        if (type === "set") {
            const currentDate = selectedDate

            if (!currentDate) return

            if (mode === "date") {
                const normalizedDate = new Date(selectedDate);
                normalizedDate.setHours(0, 0, 0, 0);
                setDate(normalizedDate);
                props.getCurrentDate(normalizedDate);
            } else {
                setDate(currentDate)
                props.getCurrentDate(currentDate)
            }


            if (Platform.OS === "android") {
                toggleDatePicker()
                setChosenDate(currentDate.toDateString())
            }

            return
        }

        toggleDatePicker()
    }

    function toggleDatePicker() {
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
                            format(new Date(chosenDate),
                                "dd MMMM yyyy HH:mm", { locale: ptBR }) : ""
                        }
                        onChangeText={setChosenDate}
                        type={props.type}
                        placeholder={props.placeholder}
                        editable={false}
                        onPressIn={toggleDatePicker}
                        label={props.label}
                        {...props}
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
                        mode={mode}
                        display="spinner"
                        is24Hour={true}
                        textColor={textColor === "dark" ? COLORS.GREY_DARK_TEXT : COLORS.WHITE}
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
    DatePicker: InputDatePicker,
    TextArea: InputTextArea,
}