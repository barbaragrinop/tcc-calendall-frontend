import * as S from "./styles";
import { LogoText } from "../../components/Logo/Text";
import { View, StyleSheet } from "react-native";

export default function Home() {
	return (
		<S.Container>
			<S.Background>
				<S.Header>
					<S.ImageLogo
						source={require("../../assets/images/logo-calendall.png")}
						style={{ width: 150, height: 150 }}
					/>
					<S.TextContainer>
						<S.TextTop>
							<LogoText size={40} />
						</S.TextTop>
						<S.TextBottom>gerenciador acadêmico</S.TextBottom>
					</S.TextContainer>
				</S.Header>
				<S.HR />
				<S.Title>Entre com a sua conta</S.Title>
				<S.Input placeholder="Digite seu email" />
				<S.Input placeholder="Digite sua senha" />
			</S.Background>
		</S.Container>
	);
}
