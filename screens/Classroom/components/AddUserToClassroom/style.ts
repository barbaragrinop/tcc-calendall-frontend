// styles.ts
import { COLORS } from "@/constants";
import styled from "styled-components/native";



export const TitleCreate = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 0 20px;
`;

export const Content = styled.View`
    padding: 0 10px;
    flex: 1;
    min-height: 300px ;
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


export const ButtonSpace = styled.View`
    padding: 20px 0 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;
`

export const ModalBody = styled.View`
    border-radius: 10px;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-height: 300px ;
    
    background-color: #eeeeee;
`