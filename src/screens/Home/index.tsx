import {
	Text,
	Alert,
} from "react-native";
import { style } from "./styles";
import { Button } from "../../components/Input/style";

export default function Home() {
	const { Container, Input } = style

	return (
		<Container>
			<Text>Home</Text>
			<Input placeholder="Type something" />
			<Button title="Press me" onPress={() => Alert.alert("Button pressed")} />
		</Container>
	);
}
