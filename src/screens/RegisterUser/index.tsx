import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as S from "./styles"

export function RegisterUser() {
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

