import { StatusBar, SafeAreaView, Platform } from "react-native";
import Home from "./src/screens/Home";
import styled from "styled-components/native";
import { COLORS } from "./src/constants/Colors";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, loadAsync } from "expo-font";
import { useEffect } from "react";

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
			return
		}

		return undefined
	}, []);


	return (
		<SafeAreaViewStyled>
			<StatusBar barStyle={"dark-content"}
				translucent={true}
				backgroundColor={"transparent"}
			/>
			<Home />
		</SafeAreaViewStyled>
	);
}

const SafeAreaViewStyled = styled.SafeAreaView`
	flex: 1;
	background-color: ${COLORS.BLUE_PRIMARY};
`
