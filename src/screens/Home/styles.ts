import { Colors } from "../../constants/Colors";
import styled from "styled-components/native";

const Container = styled.View`
    width: 100%;
    background-color: ${Colors.background.primary};
`

const Input = styled.TextInput`
    height: 40px;
    margin: 12px;
    color: "";
    border-width: 1px;
    padding: 10px;
    border-radius: 10px;
    background-color: white;
`

export const style = {
   Container, 
   Input
}