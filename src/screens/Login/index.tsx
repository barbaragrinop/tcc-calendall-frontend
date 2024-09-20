import * as S from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { Input, LogoText } from "../../components";

export function Login() {
    const navigation = useNavigation()

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
                <S.Form>
                    <S.Title>Entre com a sua conta</S.Title>
                    <Input label="e-mail" placeholder="Digite seu email" />
                    <Input label="senha" placeholder="**********" />
                    <S.EsqueceuSenha
                        onPress={() => navigation.navigate("RecoverPassword")}>
                        Esqueceu sua senha?
                    </S.EsqueceuSenha>
                    <S.Button>
                        <S.ButtonText onPress={() => navigation.navigate("Home")}>entrar</S.ButtonText>
                    </S.Button>
                </S.Form>
                <S.CadastroContainer>
                    <S.TextCadastro>ainda não é cadastrado?</S.TextCadastro>
                    <S.CadastreSeLink
                        onPress={() => navigation.navigate("RegisterUser")}
                    >
                        cadastre-se
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            style={{ color: "#fff" }}
                        />
                    </S.CadastreSeLink>
                </S.CadastroContainer>
            </S.Background>
        </S.Container>
    );
}
