import styled from "styled-components/native"

import { COLORS } from "@/constants"

export const Container = styled.View`
    width: 100%;
    height: auto;
    margin: 10px 0;
    background-color: ${COLORS.GREY_EVENTBACKGROUND};
    border-radius: 10px;
`

export const Date = styled.View<{ $priorityColor: string; }>`
    width: 20%;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    height: 100%;
    justify-content: center;
    background-color:${props => props.$priorityColor};
    border-radius: 10px 0 0 10px;
    height: 90px;;
`

export const EventTime = styled.Text`
    font-size: 18px;
    color: ${COLORS.WHITE};
`

export const EventDate = styled(EventTime)`
    font-weight: 700;
`

export const EventTitle = styled.Text`
    font-size: 20px;
    color: ${COLORS.GREY_DARK_TEXT};
    font-weight: 500;
    margin-bottom: 5px;
`

export const EventDescription = styled.Text`
    font-size: 14px;
    color: ${COLORS.GREY_DARK_TEXT};
    font-weight: 500;
`

export const EventCloseDetails = styled.View`
    width: 65%;
    background-color: ${COLORS.GREY_EVENTBACKGROUND};
    padding: 7px;
    justify-content: center;
    overflow: hidden;      
    text-overflow: ellipsis; 
    white-space: nowrap; 
    height: 90px;
`

export const IconSpace = styled.TouchableOpacity`
    width: 15%;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.GREY_EVENTBACKGROUND};
    border-radius: 0 10px 10px 0;
    height: 90px;
`


export const EventClose = styled.View<{ $isOpen: boolean; }>`
    width: 100%;
    height: ${props => props.$isOpen ? 'auto' : '90px'};
    display: flex;
    flex-direction: row;
`

export const EventTopic = styled.Text`
    font-weight: bold;
    color: ${COLORS.GREY_DARK_TEXT};
    margin-right: 5px;
`