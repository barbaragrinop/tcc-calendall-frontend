import { COLORS } from "@/constants";
import styled from "styled-components/native";

export const CollapseBody = styled.View`
    padding: 20px;
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
    /* padding: 40px 0 0; */
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;
`