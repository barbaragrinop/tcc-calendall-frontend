import { ReactNode } from "react";
import {
	StyleSheet,
	Button as ButtonRN,
	View,
	SafeAreaView,
	Text,
	Alert,
    ButtonProps
} from "react-native";

export function Button(props: ButtonProps) {
	return <ButtonRN  {...props} />;
}
