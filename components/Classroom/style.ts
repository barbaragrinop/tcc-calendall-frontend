import styled from "styled-components/native"

import { COLORS } from "@/constants"

export const Container = styled.SafeAreaView`
    margin: 10px 0;
    background-color: ${COLORS.GREY_EVENTBACKGROUND};
    border-radius: 10px;
`

export const Role = styled.View<{ $isAdmin: boolean; }>`
    width: 20%;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    height: 100%;
    justify-content: center;
    background-color:${props => props.$isAdmin ? COLORS.GOLD_DARK : COLORS.GREY_PRIORITY_LOW};
    border-radius: 10px 0 0 10px;
    height: 90px;
`

export const ClasroomID = styled.Text`
    font-size: 22px;
    color: ${COLORS.WHITE};
    font-weight: 700;
`

export const EventDate = styled(ClasroomID)`
    font-weight: 700;
`

export const Title = styled.Text`
    font-size: 23px;
    color: ${COLORS.GREY_DARK_TEXT};
    font-weight: 500;
    margin-bottom: 5px;
`

export const EventDescription = styled.Text`
    font-size: 14px;
    color: ${COLORS.GREY_DARK_TEXT};
    font-weight: 500;
`

export const ClassroomDetails = styled.View`
    background-color: ${COLORS.GREY_EVENTBACKGROUND};
    justify-content: space-between;
    overflow: hidden;      
    text-overflow: ellipsis; 
    white-space: nowrap; 
    height: 90px;
    width: 65%;
    flex-direction: column;
    padding: 10px 0 10px 10px;

`

export const EventClose = styled.View`
    height: '90px';
    display: flex;
    flex-direction: row;
    min-width: 100%;
`

export const Admin = styled.Text`
    font-size: 15px;
    color: ${COLORS.WHITE};
    background-color: ${COLORS.GOLD_DARK};
    padding: 2px 5px;
    border-radius: 5px;
`

export const Info = styled.View`
    flex-direction: row;
    color: ${COLORS.GREY_PRIORITY_LOW};
    gap: 10px;
`
export const QuantityEventsSpace = styled.View`
    flex-direction: row;
    gap: 3px;
`


export const QuantityEvents = styled.Text`
    font-size: 15px;
    color: ${COLORS.GREY_PRIORITY_LOW};
    font-weight: 500;
`

export const QuantityMembersSpace = styled(QuantityEventsSpace)``;
export const QuantityMembers = styled(QuantityEvents)``;

export const IconArrowSpace = styled.View`
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;