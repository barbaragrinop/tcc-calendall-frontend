// styles.ts
import { Button, Tabs } from "@/components";
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

export const Content = styled.ScrollView`
    margin-top: 30px;
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

export const Members = styled.View`
    flex-direction: column;
    gap: 5px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 60px;
`

export const MembersTitle = styled.Text`
    font-size: 20px;
    color: ${COLORS.WHITE};
    font-weight: bold;
    font-family: 'IBMPlexSansCondensedLight300';

`

export const MembersList = styled.View`
    flex-direction: row;
    gap: 4px;
    flex-wrap: wrap;
    position: relative;
`

export const Shape = styled.View`
    height: 100%;
    /* padding: 10px; */
    /* border-top-left-radius: 30px;
    border-top-right-radius: 30px; */
    margin-top: 50px;
    flex: 1;
`;


export const ModalBody = styled.View`
    border-radius: 10px;
    padding: 15px;
    background-color: #eeeeee;  
    padding-right: 10%;
    word-break: break-all;

`
export const UserDataSpace = styled.View`
    display: flex;
    flex-direction: row;
    gap: 15px;
    word-break: break-all;
`

export const UserInfo = styled.View`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    word-break: break-all;
    flex-wrap: wrap;  
`;

export const PressableSpace = styled.Pressable`
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background-color: ${COLORS.WHITE};
    border: 1px solid ${COLORS.WHITE};

`

export const ButtonSpace = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
    width: 100%;
`

export const ButtonWhite = styled(Button.White)`
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25); 
`

export const EventsTitle = styled.View`
    display: flex;
    justify-content: center;
    padding: 10px 10px 10px 20px;
    background-color: #6497B2;
    
`

export const EventsTitleText = styled(MembersTitle)`
    font-size: 20px;
    color: ${COLORS.WHITE};
    font-family: 'IBMPlexSansCondensedMedium';
`