import { Pressable } from 'react-native'
import * as S from './style'

type Props = {
    items: {
        title: string
        action: () => void
    }[]
}

export function Dropdown({ items }: Props) {
    return (
        <S.HeaderListOptions>
            <S.Triangle />
            {items.map(({ action, title }, index) => (
                <Pressable onPress={action} key={index}>
                    <S.HeaderOption key={title}>{title}</S.HeaderOption>
                </Pressable>
            ))}
        </S.HeaderListOptions>
    )
}