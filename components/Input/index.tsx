import { TextInputProps } from "react-native";
import * as S from "./style";
import { ReactElement } from "react";
import { RequiredSymbol } from "../RequiredSymbol";

type Props = TextInputProps & {
    required?: boolean;
    label?: string;
    isDisabled?: boolean;
    icon?: ReactElement;
};

export function Input({
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
                    <S.TextInput isDisabled={isDisabled} placeholder={placeholder} hasIcon={icon} {...props} />
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
