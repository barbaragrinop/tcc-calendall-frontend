import { Priority } from '@/@types/priority'
import * as S from './style'
import { useState } from 'react'
import { Text } from 'react-native' // Assuming you are using react-native
import { COLORS } from '@/constants'

type Props = {
    priority: Priority
}

export default function Event(props: Props){

    const [open, setIsOpen] = useState<boolean>(false)

    function getColorBasedOnPriority(){
        if(props.priority === Priority.ALTA){
            return COLORS.RED_PRIORITY_HIGH
        }

        if(props.priority === Priority.MEDIA){
            return COLORS.YELLOW_PRIORITY_MEDIUM
        }

        return COLORS.GREY_PRIORITY_LOW
    }

    return (
        <S.Container>
            <S.EventClose $priorityColor={getColorBasedOnPriority()}>
                <S.Date>
                    <Text>17h</Text>
                </S.Date>
                <S.EventCloseDetails>

                </S.EventCloseDetails>
            </S.EventClose>
        </S.Container>
    )
}