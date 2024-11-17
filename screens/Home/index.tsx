import * as S from "./style";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LogoText, Tabs, Event, Header } from "@/components";
import { COLORS } from "@/constants";
import { useCalendar } from "@/hooks";
import { EventResponse, Priority, Event as TEvent } from "@/types";
import { AddPersonalEvent } from "./AddPersonalEvent";
import { useSession } from "@/app/contexts";
import { usePersonalCalendarService } from "./hooks/usePersonalCalendarService";


const nextEvents: TEvent[] = [
    {
        notificationType: "a cada dia",
        priority: Priority.ALTA,
        time: "14h30",
        title: "Seminario Redes",
        description: "çlkasdkjasdlkjlksajdlkasjd",
    },
    {
        notificationType: "a cada semana",
        priority: Priority.BAIXA,
        time: "14h30",
        title: "Apresentação do Joseffe",
        description:
            "Falar com a Bruna e com a Nathalia pra conseguir montar apresentação e também ajudar no backend do tcc. levar o doc pra secretaria",
    },
    {
        notificationType: "a cada 2 horas",
        priority: Priority.MEDIA,
        time: "14h30",
        title: "Seminario Redes",
        description: "çlkasdkjasdlkjlksajdlkasjd",
    },
    {
        notificationType: "a cada dia",
        priority: Priority.ALTA,
        time: "14h30",
        title: "Seminario Redes",
        description: "çlkasdkjasdlkjlksajdlkasjd",
    },
    {
        notificationType: "a cada dia",
        priority: Priority.ALTA,
        time: "14h30",
        title: "Seminario Redes",
        description: "çlkasdkjasdlkjlksajdlkasjd",
    },
    {
        notificationType: "a cada dia",
        priority: Priority.ALTA,
        time: "14h30",
        title: "Seminario Redes",
        description: "çlkasdkjasdlkjlksajdlkasjd",
    },
    {
        notificationType: "a cada dia",
        priority: Priority.ALTA,
        time: "14h30",
        title: "Seminario Redes",
        description: "çlkasdkjasdlkjlksajdlkasjd",
    },
    {
        notificationType: "a cada dia",
        priority: Priority.ALTA,
        time: "14h30",
        title: "Seminario Redes",
        description: "çlkasdkjasdlkjlksajdlkasjd",
    },
];

export function HomeScreen() {
    const { data, mutate, isLoading } = usePersonalCalendarService<EventResponse[]>();
    const { Calendar, markedDates, todayEvents, nextEvents } = useCalendar(data);

    const today = format(new Date(), "dd/MMM", { locale: ptBR });

    return (
        <S.Root>
            <Header.ProfileInfo />

            <S.Container horizontal={false}>
                <AddPersonalEvent />

                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.BLUE_PRIMARY} />
                ) : (
                    <>
                        <Calendar
                            style={{
                                backgroundColor: COLORS.BLUE_PRIMARY,
                                paddingTop: 30,
                            }}
                            markedDates={markedDates}
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
                                            <View
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    padding: 10
                                                }}
                                            >
                                                <FlatList
                                                    data={todayEvents}
                                                    keyExtractor={(_, index) => index.toString()}
                                                    renderItem={({ item: event, index }) => {
                                                        return (
                                                            <Event
                                                                key={index}
                                                                notificationType={event.notificationType}
                                                                priority={event.priority}
                                                                time={event.time}
                                                                title={event.title}
                                                                description={event.description}
                                                            />
                                                        )
                                                    }} />
                                            </View>
                                        ),
                                    },
                                    {
                                        title: "Próximos eventos",
                                        component: (
                                            <View
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    padding: 10
                                                }}
                                            >
                                                <FlatList
                                                    data={nextEvents}
                                                    keyExtractor={(_, index) => index.toString()}
                                                    renderItem={({ item: event, index }) => {

                                                        const eventDate = new Date();
                                                        eventDate.setDate(
                                                            eventDate.getDate() +
                                                            (index + 2)
                                                        );

                                                        const formatDate = format(
                                                            new Date(eventDate),
                                                            "dd/MMM",
                                                            { locale: ptBR }
                                                        );

                                                        return (
                                                            <Event
                                                                key={index}
                                                                notificationType={
                                                                    event.notificationType
                                                                }
                                                                date={formatDate}
                                                                priority={event.priority}
                                                                time={event.time}
                                                                title={event.title}
                                                                description={
                                                                    event.description
                                                                }
                                                            />

                                                        )
                                                    }}
                                                />
                                            </View>
                                        ),
                                    },
                                ]}
                            />
                        </S.Shape>
                    </>
                )}
            </S.Container>
        </S.Root>
    );
}
