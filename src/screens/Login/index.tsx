import * as S from "./styles";
import { LogoText } from "../../components/Logo/Text";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface RootParamList {
    Login: undefined;
    RecoverPassword: undefined;
    RegisterUser: undefined;
}

type Props = {
    navigation: NativeStackNavigationProp<RootParamList, "Login">;
}

export function Login({ navigation }: Props) {
    // const navigation = useNavigation();

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
                    <S.Input placeholder="Digite seu email" />
                    <S.Input placeholder="Digite sua senha" />
                    <S.EsqueceuSenha
                        onPress={() => navigation.navigate("RecoverPassword")}>
                        Esqueceu sua senha?
                    </S.EsqueceuSenha>
                    <S.Button>
                        <S.ButtonText>entrar</S.ButtonText>
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
