import styled from "styled-components/native"

export const Container = styled.View`
    width: 100%;
    height: auto;
`

export const Date = styled.View`
    width: 20%;
`

export const EventCloseDetails = styled.View`
`

export const EventClose = styled.View<{ $priorityColor: string; }>`
    width: 100%;
    max-width: 150px;
    display: flex;
    flex-direction: row;
    background-color:${props => props.$priorityColor};
`


// export const 