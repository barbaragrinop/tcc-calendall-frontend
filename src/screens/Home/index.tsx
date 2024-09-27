import * as S from "./style";

import profileNoPhoto from "@/assets/images/profile-nophoto.png";

import { Text } from 'react-native'
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { LogoText, Tabs } from "@/components";
import { COLORS } from "@/constants";
import { useCalendar } from "@/hooks";

export function Home() {
    const { Calendar } = useCalendar()
    
    const today = format(new Date(), 'dd/MMM', { locale: ptBR });


    return (
        <S.Root>
            <S.LogoSpace>
                <S.CalendallText>
                    <LogoText color="#fff" size={33} />
                </S.CalendallText>
                <S.Image
                    source={profileNoPhoto}
                    style={{ width: 30, height: 30 }}
                />
            </S.LogoSpace>
            <S.Container>
                <Calendar
                    style={{ backgroundColor: COLORS.BLUE_PRIMARY, marginTop: 30 }}
                    markedDates={{
                        '2024-09-16': { marked: true },
                        '2024-09-17': { marked: true },
                        '2024-09-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                        '2024-09-19': { disabled: true, disableTouchEvent: true }
                    }}
                    theme={{
                        textSectionTitleColor: 'white',
                        textDayHeaderFontWeight: '600',
                        calendarBackground: COLORS.BLUE_PRIMARY,
                        dayTextColor: 'white',
                    }}
                />

                <S.Shape>
                    <Tabs
                        items={[
                            {
                                title: `Hoje - ${today}`,
                                component: <Text>asdasd</Text>
                            },
                            {
                                title: "Tab 2",
                                component: <Text>Tab 2</Text>
                            },
                        ]} />
                </S.Shape>
            </S.Container>


        </S.Root>
    );
}
