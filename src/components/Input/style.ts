import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";

type TextInputProps = {
    isDisabled: boolean;
};

export const Container = styled.View`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const TextInput = styled.TextInput<TextInputProps>`
    border-radius: 10px;
    background-color: #fff;
    padding: 15px 10px;
    background-color: ${({ isDisabled }) => (isDisabled ? "#898b8f" : "#fff")};
    color: ${({ isDisabled }) => (isDisabled ? "#39393b" : "#000")};
`;

export const Label = styled.Text`
    color: white;
    font-size: 15px;
`;
