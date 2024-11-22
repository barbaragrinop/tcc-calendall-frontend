import { COLORS } from "@/constants";
import styled from "styled-components/native";

export const CollapseBody = styled.View``

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
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    justify-content: space-between;
    padding: 20px 20px 30px 20px;
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

export const ClassroomList = styled.ScrollView`
    flex: 1; 
    margin-top: 30px;
    max-width: 100%;
`;

export const ListOptions = styled.View`
  display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px 20px 30px 20px;
`

export const Item = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding: 20px;
    width: 100%;
`

export const ItemText = styled.Text`
    color: ${COLORS.WHITE};
    font-size: 20px;
    font-family: 'IBMPlexSansCondensedRegular';
`

export const ButtonSpace = styled.View`
    /* padding: 40px 0 0; */
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;
`

export const ItemEvent = styled.View`
    display: "flex";
    flex-direction: "column";
    width: 100%;
    align-items: flex-end;
    justify-content: flex-end;
    background-color: #fff;
    border-radius: 10px;
`


export const ActiveNotification = styled.Text`
    
    text-align: end;
`

