import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { styles } from "./styles";

export default function Home() {
	function handleUserClick() {
		console.log("Clicou no botão");
	}

	return (
		<View style={styles.container}>
			<Text> Calendall </Text>
			<Text> Calendall </Text>
			<Text> Calendall </Text>
			<Text> Calendall </Text>
			<Text> Calendall </Text>
			<Text> Calendall </Text>
			<ScrollView>
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
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
				<TextInput
					style={styles.input}
					placeholder="Digite seu nome"
					placeholderTextColor="#6b6b6b"
					keyboardType="numeric"
				/>
			</ScrollView>

			<TouchableOpacity onPress={handleUserClick}>
				<Text>Clique aqui</Text>
			</TouchableOpacity>
		</View>
	);
}
