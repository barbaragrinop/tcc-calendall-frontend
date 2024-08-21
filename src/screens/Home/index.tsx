import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function Home() {
	function handleUserClick() {
		console.log("Clicou no botão");
	}
	return (
		<View style={styles.container}>
			<Text> Calendall </Text>
			<TextInput
				style={styles.input}
				placeholder="Digite seu nome"
				placeholderTextColor="#6b6b6b"
			/>
			<TextInput 
				style={styles.input} 
				placeholder="Digite seu nome" 
				placeholderTextColor="#6b6b6b"
				keyboardType="numeric"
			/>
			<TouchableOpacity onPress={handleUserClick}>
				<Text>Clique aqui</Text>
			</TouchableOpacity>
		</View>
	);
}
