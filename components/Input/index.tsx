import { TextInput, TextInputProps, Text, View } from "react-native";
import * as S from "./style";
import RequiredSymbol from "../RequiredSymbol";

type Props = TextInputProps & {
    required?: boolean;
    label: string;
    isDisabled?: boolean;
    Icon?: JSX.Element;
};

export default function Input({
    label,
    required = false,
    isDisabled = false,
    Icon,
    ...props
}: Props) {
    return (
        <S.Container>
            <S.Label>
                {required && <RequiredSymbol />} {label}
            </S.Label>
            <S.TextInput isDisabled={isDisabled} {...props} />
        </S.Container>
    );
}
