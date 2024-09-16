import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";

export const Container = styled.SafeAreaView`
    width: 100%;
    background-color: ${COLORS.BLUE_PRIMARY};
`;

export const Term = styled.Text`
    min-height: 100%;
    background-color: ${COLORS.BLUE_SECONDARY};
    padding: 20px;
    color: white;
    font-size: 15px;
    line-height: 20px
`;
