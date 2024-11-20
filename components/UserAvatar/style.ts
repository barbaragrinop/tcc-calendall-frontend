import styled from "styled-components/native";
import { COLORS } from "@/constants";

export const AvatarWrap = styled.View`
    position: relative;
    align-items: center;
    justify-content: center;
`;

export const InitialsCircle = styled.View`
    border-radius: 50%;
    background-color: ${COLORS.BLUE_3};
    align-items: center;
    justify-content: center;
`;

export const InitialsText = styled.Text`
    font-weight: bold;
    color: #fff;
`;