import styled from "styled-components/native";

import { COLORS } from "../../constants/Colors";

export const Container = styled.SafeAreaView`
    background-color: ${COLORS.BLUE_PRIMARY};
    flex: 1;
`;

export const LogoSpace = styled.View`
    height: 60px;
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
