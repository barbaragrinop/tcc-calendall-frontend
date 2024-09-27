import styled from "styled-components/native";

import { COLORS } from "@/constants/_colors";

export const Container = styled.SafeAreaView`
    width: 100%;
    background-color: ${COLORS.BLUE_PRIMARY};
`;

export const Input = styled.TextInput`
    height: 40px;
    margin: 12px;
    color: black;
    border-width: 1px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
`;

export const Form = styled.ScrollView`
    padding: 30px;
    background-color: ${COLORS.BLUE_SECONDARY};
`;

export const FieldForms = styled.View`
    flex-direction: column;
    gap: 30px;
`;

export const Button = styled.TouchableOpacity`
    background-color: ${COLORS.BLUE_TERTIARY};
    padding: 10px;
    margin: 10px;
    margin-top: 30px;
    border-radius: 10px;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: white;
    font-size: 17px;
    font-weight: 400;
`;

export const FormTitle = styled.Text`
    color: white;
    font-size: 16px;
    padding-bottom: 30px;
    padding-top: 30px;
`;

export const RequiredText = styled.Text`
    color: white;
    margin-top: 40px;
    margin-bottom: 10px;
    text-align: center;
    font-weight: 500;
`;

export const ButtonSpace = styled.View`
    gap: 10px;
    margin-top: 30px;
    margin-bottom: 100px;
`;
