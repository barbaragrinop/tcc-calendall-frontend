import { Text } from "react-native";

type Props = {
    size?: number;
    color?: string;
};

export default function LogoText({ color = "#fff", size = 30 }: Props) {
    return (
        <Text style={{ fontSize: size, fontFamily: "Acme", color: color }}>
            CALENDALL
        </Text>
    );
}
