import { TouchableOpacityProps, Text } from "react-native";
import * as S from "./style";

type Props = TouchableOpacityProps & {
    title: string;
    color: "dark" | "light";
};

export default function Button({ color, title, ...props }: Props) {
    return (
        <S.Button $type={color} {...props}>
            <S.Text $type={color}>{title}</S.Text>
        </S.Button>
    );
}
