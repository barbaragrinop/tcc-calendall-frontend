import * as S from "./style";
import DateTimePicker, { DateTimePickerEvent, DateTimePickerAndroid } from '@react-native-community/datetimepicker'

import { Pressable, TextInputProps, View, Platform } from "react-native";
import { ReactElement, useMemo, useState } from "react";
import { RequiredSymbol } from "../RequiredSymbol";
import { COLORS } from "@/constants";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

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
    const { mode, textColor } = props;
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [date, setDate] = useState<Date | undefined>(props.value ? new Date(props.value) : undefined);
    const [chosenDate, setChosenDate] = useState<string>("");

    function onChange(event: DateTimePickerEvent, selectedDate: Date | undefined) {
        if (Platform.OS === 'android') {
            // Fecha o picker manualmente no Android
            setShowDatePicker(false);
        }

        if (selectedDate) {
            const normalizedDate = mode === "date" ? new Date(selectedDate.setHours(0, 0, 0, 0)) : selectedDate;
            setDate(normalizedDate);
            props.getCurrentDate(normalizedDate);

            setChosenDate(format(normalizedDate, "dd MMMM yyyy HH:mm", { locale: ptBR }));
        }
    }

    function toggleDatePicker() {
        if (Platform.OS === 'android' && mode === "datetime") {
            // Gerencia o modo "datetime" para Android
            handleAndroidDateTimePicker();
        } else {
            setShowDatePicker(!showDatePicker);
        }
    }

    function handleAndroidDateTimePicker() {
        // Primeiro abre o picker de data
        DateTimePickerAndroid.open({
            mode: "date",
            value: date || new Date(),
            onChange: (event, selectedDate) => {
                if (selectedDate) {
                    // Depois de selecionar a data, abre o picker de hora
                    DateTimePickerAndroid.open({
                        mode: "time",
                        value: selectedDate,
                        onChange: (_, selectedDateTime) => {
                            if (selectedDateTime) {
                                setDate(selectedDateTime);
                                props.getCurrentDate(selectedDateTime);

                                setChosenDate(
                                    format(selectedDateTime, "dd MMMM yyyy HH:mm", { locale: ptBR })
                                );
                            }
                        },
                    });
                }
            },
        });
    }

    function getCalendarBasedOnPlatform() {
        if (Platform.OS === 'android' && mode === "datetime") {
            handleAndroidDateTimePicker()
        }
 
        
        // Em iOS, renderiza o picker normalmente
        return (
            <DateTimePicker
                mode={mode}
                display="spinner"
                is24Hour={true}
                textColor={textColor === "dark" ? COLORS.GREY_DARK_TEXT : COLORS.WHITE}
                locale="pt-BR"
                value={date || new Date()}
                onChange={onChange}
            />
        );
    }

    return (
        <View>
            <Pressable onPress={toggleDatePicker}>
                <View style={{ position: 'relative' }}>
                    <InputText
                        value={chosenDate}
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
                            // transform: [{ translateY: -5 }],
                        }}
                    />
                </View>
            </Pressable>
            {showDatePicker && !props.isDisabled && getCalendarBasedOnPlatform()}
        </View>
    );
}
export const Input = {
    Text: InputText,
    Password: InputPassword,
    Email: InputEmail,
    Number: InputNumber,
    DatePicker: InputDatePicker,
    TextArea: InputTextArea,
}