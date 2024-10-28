import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router"

export function ClassroomDetailsScreen() {
    const { id } = useLocalSearchParams(); // Obtém o ID da sala da URL

    return (
        <View>
            <Text>ClassroomDetailsScreen {id}</Text>
        </View>
    );
}