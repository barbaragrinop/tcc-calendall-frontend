import * as S from "./style";

import { ActivityIndicator, View, StyleSheet } from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Tabs, Event, Header } from "@/components";
import { COLORS } from "@/constants";
import { useCalendar } from "@/hooks";
import { EventResponse } from "@/types";
import { AddPersonalEvent } from "./AddPersonalEvent";
import { usePersonalCalendarService } from "./hooks/usePersonalCalendarService";
import { useSession } from "@/app/contexts";

export function HomeScreen() {
    const { data, isLoading, error} = usePersonalCalendarService<EventResponse[]>();
    const { session } = useSession()
    const { todayEvents, nextEvents, Calendar } = useCalendar(data);
    console.log('data', data)
    console.log('nextEvents', nextEvents)
    console.log('todayEvents', todayEvents)

    const today = format(new Date(), "dd/MMM", { locale: ptBR });

    return (
        <S.Root>
            <Header.ProfileInfo />
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.BLUE_DARK1} />
            ) : (
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
                                                    {todayEvents?.map((event, index) => (
                                                        <Event
                                                            key={index}
                                                            notificationType={event.notificationType}
                                                            priority={event.priority}
                                                            time={event.time}
                                                            title={event.title}
                                                            description={event.description}
                                                        />
                                                    ))}
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
                                                    {nextEvents?.map((event, index) => (
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
                                                    ))}
                                                </View>
                                            ),
                                        },
                                    ]}
                                />
                            </S.Shape>
                        </>
                    )}
                </S.Container>
            )}

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