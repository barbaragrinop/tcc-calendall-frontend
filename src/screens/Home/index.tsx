import * as S from "./style";

import profileNoPhoto from "../../assets/images/profile-nophoto.png";

import { LogoText } from "../../components";
import { COLORS } from "../../constants/Colors";
import { useCalendar } from "../../hooks";


export function Home() {
    const { Calendar } = useCalendar()

    return (
        <S.Container>
            <S.LogoSpace>
                <S.CalendallText>
                    <LogoText color="#fff" size={33} />
                </S.CalendallText>
                <S.Image
                    source={profileNoPhoto}
                    style={{ width: 30, height: 30 }}
                />
            </S.LogoSpace>
            <Calendar
                key={1}
                style={{ backgroundColor: COLORS.BLUE_PRIMARY }}
                markedDates={{
                    '2024-09-16': { selected: true, marked: true, selectedColor: 'blue' },
                    '2024-09-17': { marked: true },
                    '2024-09-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                    '2024-09-19': { disabled: true, disableTouchEvent: true }
                }}
            />
        </S.Container>
    );
}
