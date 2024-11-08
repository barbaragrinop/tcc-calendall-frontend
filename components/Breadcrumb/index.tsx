import { usePathname } from "expo-router";
import { View, Text } from "react-native";
import * as S from './style'

type Props = {
    dividedPath?: string[]
}

export function Breadcrumb({ dividedPath }: Props) {
    // const entirePath = usePathname()

    // const dividedPath = entirePath.split('/').filter(Boolean) //remove entradas vazias

    // if (dividedPath.length === 0) {
    //     return <View />
    // }

    // if (dividedPath.length === 1) {
    //     return (
    //         <Text style={{ fontWeight: "bold" }}>{dividedPath}</Text>
    //     )
    // }

    return (
        <S.Wrap>
            {dividedPath?.map((path, index) => {
                if (index + 1 === dividedPath.length) {
                    return (
                        <S.LastChild>{path}</S.LastChild>
                    )
                }

                return (
                    <S.NotLastChild> {path} {' >'} </S.NotLastChild>
                )
            })}
        </S.Wrap>
    )
}