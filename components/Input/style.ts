import styled from "styled-components/native";
import { ReactElement } from "react";
import { COLORS } from "@/constants";

type TextInputProps = {
    isDisabled: boolean;
    hasIcon?: ReactElement;
};

export const Container = styled.View`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const TextInput = styled.TextInput<TextInputProps>`
    border-radius: 10px;
    background-color: #fff;
    padding: ${({ hasIcon }) => (hasIcon ? "15px 65px" : "10px")};
    background-color: ${({ isDisabled }) => (isDisabled ? "#898b8f" : "#fff")};
    color: ${({ isDisabled }) => (isDisabled ? "#39393b" : "#000")};
    font-size: 18px;
`;

export const Label = styled.Text`
    color: white;
    font-size: 15px;
`;

export const ContainerInput = styled.View`
    position: relative;
`;

export const IconSpace = styled.View`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    padding: 0 16px; 
    background-color: ${COLORS.GREY_LIGHT};
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`