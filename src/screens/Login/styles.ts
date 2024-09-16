import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";
import { Input } from "../../components/Input";

export const Container = styled.SafeAreaView`
    width: 100%;
    background-color: ${COLORS.BLUE_PRIMARY};
    height: 100%;
    position: relative;
    padding-top: 100px;
`


export const LogoContainer = styled.View`
    align-items: center;
    margin-bottom: 40px;
`;

export const Background = styled.View`
    background-color: ${COLORS.BLUE_SECONDARY};
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: 0;
    top: 12%;
    border-top-left-radius: 100px;
    margin-top: 60px;
    
`;

export const TextContainer = styled.View`
    position: absolute;
    width: 100%;
    margin-top: -10px;
    display: flex;
    justify-content: end;
    align-items: flex-end;
    padding: 20px;
`;

export const ImageLogo = styled.Image``;

export const TextTop = styled.Text`
    margin-bottom: -20px;
    color: white;
`;

export const TextBottom = styled.Text`
    margin-top: 20px;
    color: white;
    font-size: 15px;
    font-weight: 200;
`;
export const Header = styled.View`
    position: relative;
    height: 15%;
    top: -9%;
    display: flex;
    justify-content: center;
`;

export const HR = styled.View`
    border-bottom-color: #fff;
    width: 60%;
    border-bottom-width: 1px;
    margin: 0 auto;
    margin-top: -30px;
`;
export const Title = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 50px;
    text-align: center;
    font-family: "Acme";
`;

export const Form = styled.View`
    padding: 20px;
`;

export const EsqueceuSenha = styled.Text`
    color: white;
    font-size: 15px;
    font-weight: 300;
    text-align: right;
`;

export const InputComponent = styled(Input)`
    margin-bottom: 20px;

`

export const Button = styled.TouchableOpacity`
    background-color: ${COLORS.BLUE_TERTIARY};
    padding: 10px;
    margin: 10px;
    margin-top: 30px;
    border-radius: 10px;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: white;
    font-size: 17px;
    font-weight: 200;
`;

export const CadastroContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 20px;
`;

export const TextCadastro = styled.Text`
    color: white;
    font-size: 15px;
    font-weight: 200;
    text-align: center;
`;

export const CadastreSeLink = styled.Text`
    font-size: 30px;
    font-weight: 200;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`;
