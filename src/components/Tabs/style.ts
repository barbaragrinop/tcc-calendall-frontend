import { COLORS } from "@/constants";
import styled from "styled-components/native";

export const AllTitles = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const TitleContent = styled.View`
    width: 50%;
    height: 50px;
    justify-content: center; 
    align-items: center;   
`;

export const Title = styled.Text<{ $isSelected?: boolean; }>`
    background-color: ${props => props.$isSelected ? COLORS.BLUE_SECONDARY : COLORS.BLUE_3};
    font-weight: ${props => props.$isSelected ? 600 : 300};
    font-size: 16px;
    color: ${COLORS.WHITE};
    width: 100%;
    height: 100%;
    text-align: center; 
    line-height: 50px;  
`;

export const SpaceContent = styled.View`
    margin-top: 40px;
    width: 100%;



`