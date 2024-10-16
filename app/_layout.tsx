import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Tabs, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";

export { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [loaded, error] = useFonts({
        Acme: require("../assets/fonts/Acme-Regular.ttf"),
        IBMPlexSansCondensedRegular: require("../assets/fonts/IBMPlexSansCondensed-Regular.ttf"),
        IBMPlexSansCondensedBold: require("../assets/fonts/IBMPlexSansCondensed-Bold.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
     
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
