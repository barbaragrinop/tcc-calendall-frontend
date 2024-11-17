import { COLORS } from "@/constants";
import styled from "styled-components/native";


export const HeaderCollapse = styled.View`
    padding: 15px 20px;
    margin: 0 10px 2px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    background-color: ${COLORS.WHITE};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.09);
`

export const TitleIconSpace = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 13px;
    background-color: ${COLORS.WHITE};
`

export const TitleCollapse = styled.Text`
    font-size: 18px;
    color: ${COLORS.GREY_PRIORITY_LOW};
    font-weight: bold;
    font-family: 'IBMPlexSansCondensedBold';
`

export const CollapseIconSpace = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    border-radius: 10px;
`


export const CollapseBody = styled.View`
    margin:3px 10px 2px 10px;
    border-radius: 10px;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #eeeeee;
`

export const Label = styled.Text<{ type: "white" | "gray" }>`
    font-size: 15px;
    color: ${({ type }) => (type === "gray" ? COLORS.GREY_PRIORITY_LOW : COLORS.WHITE)};
`;

export const LabelSpace = styled.View`
    display: flex;
    flex-direction: row;
`

export const CustomNotificationSpace = styled.View`
    padding: 10px 10px 10px 5px;
`

export const ButtonSpace = styled.View`
    padding: 40px 0 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;
`