import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";

export const Header = styled.View`
    width: 100%;
    border-bottom: 1px solid ${COLORS.BLUE_SECONDARY};
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 10px;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    color: white;
    font-size: 23px;
    border-bottom: 1px solid red;
    line-height: 30px;
`;

export const IconSpace = styled.View`
    color: white;
    border: 2px solid white;
    border-radius: 50%;
    padding: 3px;
    background-color: ${COLORS.BLUE_SECONDARY};
`;