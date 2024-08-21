import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        // display: "flex",
        // flex: 1,
        // justifyContent: "center",
        width: "100%",
        backgroundColor: Colors.background.primary,
    },
    input: {
        height: 40,
        margin: 12,
        color: "",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10, 
        backgroundColor: "white",
    }
})