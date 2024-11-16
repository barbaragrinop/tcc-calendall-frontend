import { TouchableOpacityProps, Text } from "react-native";
import * as S from "./style";
import { ReactNode } from "react";

type Props = TouchableOpacityProps & {
    title: string;
    color: "dark" | "light";
};

export function ButtonColored({ color, title, ...props }: Props) {
    return (
        <S.Button $type={color} {...props}>
            <S.Text $type={color}>{title}</S.Text>
        </S.Button>
    );
}

//add touchable opacity props 
type PropsButtonWhite = TouchableOpacityProps & {
    title: string
}
export function ButtonWhite({ title, ...props }: PropsButtonWhite) {
    return (
        <S.ButtonWHITE {...props}>
            <S.TitleWHITE>{title}</S.TitleWHITE>
        </S.ButtonWHITE>
    )
}

export const Button = {
    White: ButtonWhite,
    Common: ButtonColored,
}
