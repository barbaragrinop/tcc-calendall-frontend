import { Text } from "react-native";
import { COLORS } from "@/constants/_colors";

export function RequiredSymbol() {
    return <Text style={{ color: COLORS.RED }}>*</Text>;
}
