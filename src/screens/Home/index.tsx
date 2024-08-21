import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	FlatList,
	Alert,
} from "react-native";
import { styles } from "./styles";

export default function Home() {
	function handleUserClick() {
		return Alert.alert("Clicou no botão", "Você clicou?", [
			{
				text: "Não",
				onPress: () => console.log("Clicou em não"),
			},
			{
				text: "Sim",
				onPress: () => console.log("Clicou em sim"),
			}
		])
	}

	// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	const arr: number[] = [];

	return (
		<View style={styles.container}>
			<Text> Calendall </Text>
			<Text> Calendall </Text>
			<Text> Calendall </Text>
			<Text> Calendall </Text>
			<Text> Calendall </Text>
			<Text> Calendall </Text>
			<FlatList
				data={arr}
				keyExtractor={(item) => item.toString()}
				renderItem={({ item }) => (
					<TextInput
						style={styles.input}
						placeholder="Digite seu nome"
						placeholderTextColor="#6b6b6b"
						keyboardType="numeric"
						key={item}
					/>
				)}
				showsVerticalScrollIndicator={false} // hide scroll bar
				ListEmptyComponent={<Text>Não há itens</Text>}
			/>
			{/* <ScrollView>
				{arr.map((item) => (
					<TextInput
						style={styles.input}
						placeholder="Digite seu nome"
						placeholderTextColor="#6b6b6b"
						keyboardType="numeric"
						key={item}
					/>
				))}
			</ScrollView> */}
			{/* difference between flatlist and scrollview
				FlatList:
				- Better performance for long lists
				- Only renders the items that are visible on the screen
				ScrollView:
				- Renders all the items at once
				- Bad performance for long lists
				- Use only for small lists
				- Use only for a small number of items
			*/}
			<TouchableOpacity onPress={handleUserClick}>
				<Text>Clique aqui</Text>
			</TouchableOpacity>
		</View>
	);
}
