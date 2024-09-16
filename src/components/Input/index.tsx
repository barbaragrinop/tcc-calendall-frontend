import { TextInput, TextInputProps, Text, View } from "react-native";
import * as S from "./style";
import { RequiredSymbol } from "../RequiredSymbol";

type Props = TextInputProps & {
    required?: boolean;
    label: string;
};

export function Input({ label, required = false, ...props }: Props) {
    return (
        <S.Container>
            <S.Label>
                {required && <RequiredSymbol />} {label}
            </S.Label>
            <S.TextInput {...props} />
        </S.Container>
    );
}
