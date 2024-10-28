import styled from "styled-components/native";
import { COLORS } from "@/constants/_colors";

export const Header = styled.View`
    width: 100%;
    border-bottom: 1px solid ${COLORS.BLUE_SECONDARY};
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 10px;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    color: white;
    font-size: 23px;
    border-bottom: 1px solid red;
    line-height: 30px;
`;

export const IconSpace = styled.View`
    color: white;
    border: 2px solid white;
    border-radius: 50%;
    padding: 3px;
    background-color: ${COLORS.BLUE_SECONDARY};
`;
export const LogoSpace = styled.SafeAreaView`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 110px;
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
