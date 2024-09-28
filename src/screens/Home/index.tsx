import * as S from "./style";

import profileNoPhoto from "@/assets/images/profile-nophoto.png";

import { Text, View } from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LogoText, Tabs, Event } from "@/components";
import { COLORS } from "@/constants";
import { useCalendar } from "@/hooks";
import { Priority } from "@/@types/priority";

export function Home() {
    const { Calendar } = useCalendar();

    const today = format(new Date(), "dd/MMM", { locale: ptBR });

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
                    style={{
                        backgroundColor: COLORS.BLUE_PRIMARY,
                        marginTop: 30,
                    }}
                    markedDates={{
                        "2024-09-16": { marked: true },
                        "2024-09-17": { marked: true },
                        "2024-09-18": {
                            marked: true,
                            dotColor: "red",
                            activeOpacity: 0,
                        },
                        "2024-09-19": {
                            disabled: true,
                            disableTouchEvent: true,
                        },
                    }}
                    theme={{
                        textSectionTitleColor: "white",
                        textDayHeaderFontWeight: "600",
                        calendarBackground: COLORS.BLUE_PRIMARY,
                        dayTextColor: "white",
                    }}
                />

                <S.Shape>
                    <Tabs
                        items={[
                            {
                                title: `Hoje - ${today}`,
                                component: (
                                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Event notificationType="a cada dia" priority={Priority.ALTA} time="14h30" title="Seminario Redes" description="çlkasdkjasdlkjlksajdlkasjd" />
                                        <Event notificationType="a cada semana" priority={Priority.BAIXA} time="14h30" title="Apresentação do Joseffe" description="Falar com a Bruna e com a Nathalia pra conseguir montar apresentação e também ajudar no backend do tcc. levar o doc pra secretaria" />
                                        <Event notificationType="a cada 2 horas" priority={Priority.MEDIA} time="14h30" title="Seminario Redes" description="çlkasdkjasdlkjlksajdlkasjd" />
                                        <Event notificationType="a cada dia" priority={Priority.ALTA} time="14h30" title="Seminario Redes" description="çlkasdkjasdlkjlksajdlkasjd" />
                                    </View>
                                ),
                            },
                            {
                                title: "Próximos eventos",
                                component: <Text>Tab 2</Text>,
                            },
                        ]}
                    />
                </S.Shape>
            </S.Container>
        </S.Root>
    );
}
