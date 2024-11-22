import { View, Text } from "react-native";
import { Input } from "../Input";
import * as  S from './style' 

type Props = {
    hours?: string;
    minutes?: string;
    seconds?: string;
    setHours: (value: string) => void;
    setMinutes: (value: string) => void;
    setSeconds: (value: string) => void;
}

export function CustomNotification({
    hours ,
    minutes ,
    seconds ,
    setHours,
    setMinutes,
    setSeconds
}: Props) {

    return (
        <S.Container>
            <S.Title>Desejo receber notificações a cada: </S.Title>
            <S.Fields>
                <Input.Number
                    style={{ minWidth: '25%' }}
                    type="gray"
                    label="Hora(s)"
                    value={hours}
                    onChangeText={setHours}
                />
                <Input.Number
                    style={{ minWidth: '25%' }}
                    type="gray"
                    label="Minuto(s)"
                    value={minutes}
                    onChangeText={setMinutes}
                />
                <Input.Number
                    style={{ minWidth: '25%' }}
                    type="gray"
                    label="Segundo(s)"
                    value={seconds}
                    onChangeText={setSeconds}
                />
            </S.Fields>
        </S.Container>
    )
}