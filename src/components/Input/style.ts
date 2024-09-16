import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";

export const Container = styled.View`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const TextInput = styled.TextInput`
    border-radius: 10px;
    background-color: #fff;
    padding: 15px 10px;
`;

export const Label = styled.Text`
	color: white;
	font-size: 15px;
`
