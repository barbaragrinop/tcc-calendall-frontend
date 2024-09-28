import styled from "styled-components/native";

import { COLORS } from "@/constants/_colors";

export const Container = styled.ScrollView`
    background-color: ${COLORS.BLUE_PRIMARY};

`;

export const Root = styled.SafeAreaView`
    background-color: ${COLORS.BLUE_PRIMARY};
    flex-direction: column;
`;

export const LogoSpace = styled.SafeAreaView`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const CalendallText = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-right: -40px;
`;

export const Image = styled.Image`
    margin-right: 30px;
`

export const Shape = styled.SafeAreaView`
    height: 100%;
    background-color: ${COLORS.BLUE_SECONDARY};
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    margin-top: 30px;
    overflow: hidden;
`;