import { Text } from "react-native";
import { COLORS } from "@/constants/_colors";

export default function RequiredSymbol() {
    return <Text style={{ color: COLORS.RED }}>*</Text>;
}
