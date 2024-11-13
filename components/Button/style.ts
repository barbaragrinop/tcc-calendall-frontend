import styled from "styled-components/native";
import { COLORS } from "@/constants/_colors";

export const Button = styled.TouchableOpacity<{ $type: "dark" | "light" }>`
    background-color: ${(props) => {
        if (props.disabled) {
            return COLORS.GREY_LIGHT
        }

        if (props.$type === "dark") {
            return COLORS.BLUE_TERTIARY
        }

        return COLORS.BLUE_LIGHT
    }};
    padding: 13px 10px;
    border-radius: 10px;
    border: ${(props) =>
        props.$type === "light" ? COLORS.BLUE_DARK1 : COLORS.BLUE_TERTIARY}
        1px solid;
    align-items: center;
    width: 100%;
`;

export const Text = styled.Text<{ $type: "dark" | "light" }>`
    font-size: 17px;
    color: ${(props) =>
        props.$type === "dark" ? COLORS.WHITE : COLORS.BLUE_DARK1};
`;
