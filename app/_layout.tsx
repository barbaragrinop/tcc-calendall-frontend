import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useFonts } from "expo-font";
import { router, Slot } from "expo-router";
import { useEffect } from "react";
import SessionProvider, { useSession } from "./contexts";

export { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    initialRouteName: "login",
};

export default function RootLayout() {

    const { session } = useSession();

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

    useEffect(() => {
        if (session) {
            router.navigate("/(auth)/(tabs)");
        }
    }, [])

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <SessionProvider>
            <Slot />
        </SessionProvider>
    );
}
