import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useFonts } from "expo-font";
import { Stack, Tabs, useSegments } from "expo-router";
import { useEffect } from "react";

export { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [loaded, error] = useFonts({
        Acme: require("../assets/fonts/Acme-Regular.ttf"),
        IBMPlexSansCondensedRegular: require("../assets/fonts/IBMPlexSansCondensed-Regular.ttf"),
        IBMPlexSansCondensedBold: require("../assets/fonts/IBMPlexSansCondensed-Bold.ttf"),
        IBMPlexSansCondensedLight300: require("../assets/fonts/IBMPlexSansCondensed-Light.ttf")
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
