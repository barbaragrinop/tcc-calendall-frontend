import styled from "styled-components/native";
import { Input } from "../Input";
import { COLORS } from "@/constants";

export const Container = styled.View`
    flex-direction: column;
    gap: 40px;
`

export const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    font-family: "IBMPlexSansCondensedBold";
    color: ${COLORS.GREY_PRIORITY_LOW};
`

export const Fields = styled.View`
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    width: 100%;

`

export const FieldNumber = styled(Input.Number)`
    width: 33%;
`