import { EventResponse, Priority, Event } from "@/types";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { isAfter, parseISO } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
    LocaleConfig,
    Calendar as RNCalendar,
    CalendarProps as RNCalendarProps,
} from "react-native-calendars";
import { ContextProp, DateData } from "react-native-calendars/src/types";

LocaleConfig.locales.fr = {
    monthNames: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ],
    monthNamesShort: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
    ],
    dayNames: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
    ],
    dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
};

LocaleConfig.defaultLocale = "fr";

type CalendarProps = RNCalendarProps & ContextProp;

export function useCalendar(data?: EventResponse[]) {
    console.log('data ajLAJK SDAÇLKSJ DÇLS JDALSKD JÇL', data)
    const [selectedDay, setSelectedDay] = useState<string>("");
    const [todayDate, setToday] = useState<string>("");

    useEffect(() => {
        const todayDate = new Date().toISOString().split("T")[0];
        setToday(todayDate);
        setSelectedDay(todayDate);
    }, []);

    const handleDayPress = (date: DateData) => {
        setSelectedDay(date.dateString);
    };

    const priorityColors: Record<string, string> = {
        BAIXA: "gray",
        MEDIA: "yellow",
        ALTA: "red",
    };

    const markedDates = useMemo(() => {
        if (!data) return

        return data.reduce((acc, item) => {
            const { dt_evento } = item.evento;
            const { tipoPrioridade } = item;

            acc[dt_evento] = {
                marked: true,
                dotColor: priorityColors[tipoPrioridade] || "gray", // Default color if priority is not listed
            };

            return acc;
        }, {} as Record<string, { marked: boolean; dotColor: string }>);
    }, [data]);

    const formatEvent = (item: EventResponse): Event => {
        const { evento, tipoNotificacao, tipoPrioridade } = item;
        return {
            notificationType: tipoNotificacao,
            priority: tipoPrioridade as unknown as Priority,
            time: "14h30", // Substituir pelo horário correto, se disponível
            date: evento.dt_evento,
            title: evento.titulo,
            description: evento.descricao,
        };
    };

    const today = new Date().toISOString().split("T")[0];

    const todayEvents = useMemo<Event[]>(() => {
        if (!data) return [];

        return data.filter((item) => item.evento.dt_evento === today)
            .map(formatEvent);
    }, [data, todayDate])

    const nextEvents = useMemo<Event[]>(() => {
        if (!data) return [];

        
        
        return data.filter((item) => isAfter(parseISO(item.evento.dt_evento), parseISO(today)))
        .map((item) => {
                console.log('parseISO(item.evento.dt_evento)', parseISO(item.evento.dt_evento))
                const formattedEvent = formatEvent(item);
                delete formattedEvent.date; // Remover a propriedade `date` de nextEvents
                return formattedEvent;
            });
    }, [data, todayDate])

    function customHeader(date: XDate | undefined) {
        if (!date) return;

        const month = date.toString("MMMM");
        const year = date.getFullYear();

        return (
            <View style={styles.headerContainer}>
                <View style={styles.monthYearContainer}>
                    <Text style={styles.monthText}>{month}</Text>
                    <Text style={styles.yearText}>{year}</Text>
                </View>
            </View>
        );
    }

    function customArrows(direction: "left" | "right") {
        if (direction === "left") {
            return (
                <FontAwesomeIcon icon={faChevronLeft} style={styles.arrow} />
            );
        }

        return <FontAwesomeIcon icon={faChevronRight} style={styles.arrow} />;
    }
    function Calendar(props?: CalendarProps & ContextProp) {
        return (
            <RNCalendar
                key={selectedDay}
                onDayPress={handleDayPress}
                renderHeader={customHeader}
                renderArrow={customArrows}
                {...props}
            />
        );
    }

    return {
        Calendar,
        customArrows,
        customHeader,
        todayDate,
        markedDates,
        today,
        todayEvents,
        nextEvents,
        priorityColors
    };
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    monthYearContainer: {
        alignItems: "center",
    },
    monthText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "IBMPlexSansCondensedBold",
    },
    yearText: {
        color: "white",
        fontSize: 15,
        fontFamily: "IBMPlexSansCondensedLight300",
    },
    arrow: {
        color: "white",
        fontSize: 20,
        paddingHorizontal: 10,
    },
});
