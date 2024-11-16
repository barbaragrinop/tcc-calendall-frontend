import styled from "styled-components/native";


export const HeaderListOptions = styled.View`
    position: absolute;
    top: 80%;
    right: 12px;
    min-width: 50%;
    max-width: 50%;
    width: auto;
    background-color: white;
    height: auto;
    z-index: 200;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const HeaderOption = styled.Text`
    padding: 10px;
    color: black;
    font-size: 16px;
    text-align: center;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
`
export const Triangle = styled.View`
    position: absolute;
    top: -12px;
    right: 20px; 
    width: 0;
    height: 0;
    border-left-width: 12px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-left-color: transparent;
    border-right-width: 12px;
    border-right-color: transparent;
    border-bottom-width: 12px;
    border-bottom-color: #ccc; 
    z-index: 100;
`;