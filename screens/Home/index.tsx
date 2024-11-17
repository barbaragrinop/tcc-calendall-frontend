import * as S from "./style";
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Tabs, Event, Header } from "@/components";
import { COLORS } from "@/constants";
import { useCalendar } from "@/hooks";
import { EventResponse } from "@/types";
import { AddPersonalEvent } from "./AddPersonalEvent";
import { usePersonalCalendarService } from "./hooks/usePersonalCalendarService";


export function HomeScreen() {
    const { data, isLoading } = usePersonalCalendarService<EventResponse[]>();
    const { todayEvents, nextEvents, Calendar } = useCalendar(data);

    const today = format(new Date(), "dd/MMM", { locale: ptBR });

    return (
        <S.Root>
            <Header.ProfileInfo />
            {!data && (
                <ActivityIndicator size="large" color={COLORS.BLUE_DARK1} />
            )}
            <S.Container horizontal={false}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.BLUE_PRIMARY} />
                ) : (
                    <>
                        <AddPersonalEvent />
                        <Calendar />
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

                                                        return (
                                                            <Event
                                                                key={index}
                                                                notificationType={
                                                                    event.notificationType
                                                                }
                                                                date={event.date}
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});