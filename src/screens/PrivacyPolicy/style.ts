import styled from "styled-components/native";
import { COLORS } from "@/constants/_colors";

export const Container = styled.SafeAreaView`
    width: 100%;
    background-color: ${COLORS.BLUE_PRIMARY};
`;

export const Policy = styled.ScrollView`
    background-color: ${COLORS.BLUE_SECONDARY};
    color: white;
    font-size: 15px;
`;

export const Paragraph = styled.Text`
    padding: 20px;
    color: white;
    font-size: 15px;
    line-height: 20px;
`;



