import { Modal, Event as EventComponent } from "@/components";
import { COLORS } from "@/constants";
import { EventResponse, Priority, Event } from "@/types";
import {
    faChevronLeft,
    faChevronRight,
    faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { format, isAfter, parseISO, subHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text, Pressable, FlatList } from "react-native";
import {
    LocaleConfig,
    Calendar as RNCalendar,
    CalendarProps as RNCalendarProps,
} from "react-native-calendars";
import { ContextProp, DateData } from "react-native-calendars/src/types";
import { KeyedMutator } from "swr";

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

export function useCalendar(outsideData?: EventResponse[]) {
    const [todayDate, setToday] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<DateData | null>()
    const [data, setData] = useState<EventResponse[]>([])

    useEffect(() => {
        const todayDate = new Date().toISOString()
        setToday(todayDate);
        setSelectedDate({
            dateString: todayDate,
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            timestamp: new Date().getTime()
        });
    }, []);

    useEffect(() => {
        if (!outsideData) return;

        setData(outsideData)
    }, [outsideData])

    const priorityColors: Record<string, string> = {
        BAIXA: COLORS.GREY_PRIORITY_LOW,
        MEDIA: COLORS.YELLOW_PRIORITY_MEDIUM,
        ALTA: COLORS.RED_PRIORITY_HIGH,
    };

    const markedDates = useMemo(() => {
        if (!data) return;

        const reducedDates = data?.reduce((acc, item) => {
            const { dt_evento } = item.evento;

            const formattedEventDate = format(parseISO(dt_evento), "yyyy-MM-dd");

            acc[formattedEventDate] = {
                marked: true,
            };

            return acc;
        }, {} as Record<string, { marked: boolean; selected?: boolean; selectedColor?: string; textStyle?: object }>);

        if (selectedDate?.dateString) {
            reducedDates[selectedDate.dateString] = {
                ...reducedDates[selectedDate.dateString],
                selected: true,
                selectedColor: "#ADD8E6",
                textStyle: { fontWeight: "bold", color: "#000" },
            };
        }

        return reducedDates;
    }, [data, selectedDate]);

    const formatEvent = (item: EventResponse): Event => {
        if (!item) return {} as Event;

        const { evento, tipoNotificacao, tipoPrioridade } = item;
        const parsedDate = parseISO(evento.dt_evento);

        return {
            notificationType: tipoNotificacao,
            priority: tipoPrioridade,
            time: format(parsedDate, "HH'h'mm", { locale: ptBR }),
            date: format(parsedDate, "dd/MMM", { locale: ptBR }),
            title: evento.titulo,
            description: evento.descricao,
        };
    };

    const todayEvents = useMemo<Event[]>(() => {
        if (!data) return [];

        const aux = data?.filter((item) => {
            const eventDate = format(parseISO(item.evento.dt_evento), "yyyy-MM-dd")
            const todayFormatted = format(todayDate, "yyyy-MM-dd")

            return eventDate === todayFormatted
        }).map(formatEvent)

        return aux
    }, [data, todayDate])

    const nextEvents = useMemo<Event[]>(() => {
        if (!data) return [];

        const aux = data?.filter((item) => {
            const eventDate = format(parseISO(item.evento.dt_evento), "yyyy-MM-dd")
            const todayFormatted = format(todayDate, "yyyy-MM-dd")

            return isAfter(parseISO(eventDate), parseISO(todayFormatted))
        }).map(formatEvent)

        return aux
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
        const [isModalVisible, setModalVisible] = useState(false);
        const [eventsFromSelectedDate, setEventsFromSelectedDate] = useState<Event[]>([])
        const [selectedDateLongPress, setSelectedDateLongPress] = useState<string>('')

        function handleOnLongPress(date: DateData) {
            setSelectedDateLongPress(date.dateString)

            const events = data?.filter((item) => {
                if (!item.evento) return false

                const eventDate = format(parseISO(item.evento.dt_evento), "yyyy-MM-dd")
                const selectedDateFormatted = format(parseISO(date.dateString), "yyyy-MM-dd")

                return eventDate === selectedDateFormatted
            }).map(formatEvent)
            setEventsFromSelectedDate(events || [])
        }

        function onCloseModal() {
            setModalVisible(false);
        }

        function onOpenModal() {
            setModalVisible(true);
        }

        return (
            <>
                <RNCalendar
                    key={selectedDate?.dateString}
                    renderHeader={customHeader}
                    renderArrow={customArrows}
                    markedDates={markedDates}
                    theme={{
                        textSectionTitleColor: "white",
                        selectedDayTextColor: COLORS.BLUE_SECONDARY,
                        todayButtonFontWeight: "bold",
                        dayTextColor: "white",
                        textMonthFontSize: 30,
                        todayTextColor: COLORS.BLUE_TERTIARY,
                        todayBackgroundColor: COLORS.BLUE_3,
                        textDayFontFamily: "IBMPlexSansCondensedRegular",
                        calendarBackground: 'transparent',
                        dotColor: COLORS.BLUE_TERTIARY,
                    }}
                    onDayPress={setSelectedDate}
                    onDayLongPress={(date) => {
                        handleOnLongPress(date)
                        onOpenModal()
                    }}
                    {...props}
                />

                <Modal
                    closeModal={onCloseModal}
                    title={`Eventos - ${selectedDateLongPress
                        ? format(parseISO(selectedDateLongPress), "dd/MM/yyyy", { locale: ptBR })
                        : ""
                        }`}
                    visible={isModalVisible}
                >
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10
                        }}
                    >
                        {eventsFromSelectedDate?.map((event, index) => {
                            return (
                                <EventComponent
                                    key={index}
                                    notificationType={event.notificationType}
                                    priority={event.priority}
                                    time={event.time}
                                    title={event.title}
                                    description={event.description}
                                />
                            )
                        })}
                    </View>
                </Modal>
            </>
        );
    }

    return {
        Calendar,
        todayEvents,
        nextEvents,
        selectedDate
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

    refreshIcon: {
        width: "10%",
        padding: 8,
        backgroundColor: COLORS.BLUE_3,
        textAlign: "center",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,

    }
});
