import styled from 'styled-components/native'; // Importando styled-components
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";

// Container do Modal
export const Container = styled.SafeAreaView`
  background-color: #00000099;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

// Popup do Modal
export const Popup = styled.View`
  width: 90%;
  max-height: 90%;  /* max-height: 90%; // Limita a altura para evitar que o modal ultrapasse a tela. */
  border-radius: 20px;
  background-color: ${COLORS.WHITE};
  align-items: center;
  position: relative;
  overflow: hidden; 
`;

// Botão de fechar
export const CloseModalButton = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  top: 15px;
  z-index: 10;
  background-color: #fff;
  border-radius: 40px;
`;

// Botão (geral)
export const Button = styled.View`
  border-top-width: 1px;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

// Texto do botão
export const ButtonText = styled.Text`
  font-weight: 500;
`;

// Wrapper do botão
export const ButtonWrapper = styled.View`
  flex-direction: row;
  margin-top: 16px;
  overflow: hidden;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;


export const HeaderSpace = styled.View`
    background-color: ${COLORS.BLUE_3};
    width: 100%;
    justify-content: 'center';
    align-items: 'flex-start';
`;

export const Title = styled.Text`
    font-size: 20px;
    padding: 15px 20px 15px 20px; 
    background-color: ${COLORS.BLUE_3};
    text-align: start;
    width: 100%;
    color: ${COLORS.WHITE};
    font-weight:600 ;
    overflow: hidden;
`;

export const ScrollViewContainer = styled.ScrollView`
    max-height: 500px;
    width: 100%;
    margin-bottom:20px;
    padding-top: 20px;
`