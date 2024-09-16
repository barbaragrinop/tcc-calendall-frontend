import { Text } from "react-native";
import { COLORS } from "../../constants/Colors";

export default function RequiredSymbol() {
    return <Text style={{ color: COLORS.RED }}>*</Text>;
}
