import styled from "styled-components/native";
import { COLORS } from "../../constants/Colors";

export const Container = styled.View`
    width: 100%;
    background-color: ${COLORS.BLUE_PRIMARY}; /* Cor azul claro */
    height: 100%;
    position: relative;
`;

export const Input = styled.TextInput`
    height: 40px;
    margin: 12px;
    color: black;
    border-width: 1px;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
`;

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

export const ImageLogo = styled.Image``

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
`

export const HR = styled.View`
    border-bottom-color: #fff;
    width: 60%;
    border-bottom-width: 1px;
    margin: 0 auto;
    margin-top: -30px ;
    margin-bottom: 20px;
`
export const Title = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
    font-family: "Acme";
`

export const Form = styled.View`

`