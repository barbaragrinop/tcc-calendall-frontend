import { COLORS } from "@/constants";
import styled from "styled-components/native";

export const Wrap = styled.View`
    background-color: ${COLORS.BLUE_PRIMARY}; 
`

export const LogoSpace = styled.SafeAreaView`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 110;
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

export const Content = styled.SafeAreaView`
    min-height: 100%;
    background-color: ${COLORS.BLUE_SECONDARY};
`

export const TitleCreate = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

export const TitleScreen = styled.Text`
    font-size: 30px;
    color: ${COLORS.WHITE};
    font-weight: bold;
    font-family: 'IBMPlexSansCondensedBold';
`

export const ButtonCreateClassroom = styled.TouchableOpacity`
    background-color: ${COLORS.WHITE};
    padding: 10px 20px;
    border-radius: 10px;
`

export const TitleCreateClassroom = styled.Text`
    font-size: 18px;
    color: ${COLORS.GREY_PRIORITY_LOW};
    font-weight: bold;
    font-family: 'IBMPlexSansCondensedBold';
`