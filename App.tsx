import { StatusBar, SafeAreaView, Platform, Text } from "react-native";
import { Login } from "./src/screens/Login";
import styled from "styled-components/native";
import { COLORS } from "./src/constants/_colors";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, loadAsync } from "expo-font";
import { useEffect } from "react";
import { Routes } from "./src/routes";

export default function App() {
    const [fontsLoaded] = useFonts({
        Acme: require("./src/assets/fonts/Acme-Regular.ttf"),
    });

    useEffect(() => {
        if (fontsLoaded) {
            loadAsync({
                Acme: require("./src/assets/fonts/Acme-Regular.ttf"),
            });

            SplashScreen.hideAsync();
            return;
        }

        return undefined;
    }, []);

    return (
        <SafeAreaViewStyled>
            <StatusBar

                backgroundColor={"transparent"}
            />
            {fontsLoaded ? <Routes /> : <Text>carregando...</Text>}
        </SafeAreaViewStyled>
    );
}

const SafeAreaViewStyled = styled.View`
    height: 100%;
    background-color: ${COLORS.BLUE_PRIMARY};
`;
