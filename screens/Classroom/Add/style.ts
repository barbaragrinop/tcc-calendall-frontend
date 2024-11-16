// styles.ts
import { COLORS } from "@/constants";
import styled from "styled-components/native";

export const Wrap = styled.View`
    background-color: ${COLORS.BLUE_PRIMARY}; 
    flex: 1;
`;

export const LogoSpace = styled.SafeAreaView`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 110px;
`;

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${COLORS.BLUE_SECONDARY};
`;

export const TitleCreate = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 0 20px;
`;

export const Content = styled.View`
    padding: 0 10px;
    flex: 1; 
`;

export const TitleScreen = styled.Text`
    font-size: 30px;
    color: ${COLORS.WHITE};
    font-weight: bold;
    font-family: 'IBMPlexSansCondensedBold';
`;

export const ButtonCreateClassroom = styled.TouchableOpacity`
    background-color: ${COLORS.WHITE};
    padding: 10px 20px;
    border-radius: 10px;
`;

export const TitleCreateClassroom = styled.Text`
    font-size: 18px;
    color: ${COLORS.GREY_PRIORITY_LOW};
    font-weight: bold;
    font-family: 'IBMPlexSansCondensedBold';
`;

export const ClassroomList = styled.View`
    flex: 1; 
    margin-top: 50px;
    max-width: 100%;
`;

