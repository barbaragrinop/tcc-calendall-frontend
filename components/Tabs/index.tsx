import React from 'react';
import * as S from './style'
import { useMemo, useState } from "react";

type Props = {
    items: {
        title: string;
        component: React.ReactNode;
    }[],
    todayDate?: string
}

export function Tabs({ items }: Props) {

    const titles = useMemo(() => {
        return items.map((item, index) => {
            return {
                title: item.title,
                index: index
            }
        })
    }, [items])

    const [selectedItemIndex, setSelectedIndex] = useState<number>(0)

    const currentContent = useMemo(() => {
        return items[selectedItemIndex].component
    }, [selectedItemIndex, items])

    

    return (
        <>
            <S.AllTitles>
                {titles.map(({ title }, index) => {
                    return (
                        <S.TitleContent key={index}>
                            <S.Title
                                $isSelected={selectedItemIndex === index}
                                onPress={() => setSelectedIndex(index)}
                                key={index}
                            >
                                {title}
                            </S.Title>
                        </S.TitleContent>
                    )
                })}
            </S.AllTitles>
            <S.SpaceContent>
                {currentContent}
            </S.SpaceContent>

        </>
    )

}
