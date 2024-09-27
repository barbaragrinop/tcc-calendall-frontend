import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { LocaleConfig, Calendar as RNCalendar, CalendarProps as RNCalendarProps } from "react-native-calendars";
import { ContextProp } from "react-native-calendars/src/types";

LocaleConfig.locales.fr = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
}

LocaleConfig.defaultLocale = 'fr';

type CalendarProps = RNCalendarProps & ContextProp

export default function useCalendar() {
    const [currentMonth, setCurrentMonth] = useState('');

    useEffect(() => {
        const today = new Date();

        const monthName = today.toLocaleString('default', { month: 'long' });
        setCurrentMonth(monthName);
    }, [])

    function customHeader(date: XDate | undefined) {
        if (!date) return;

        const month = date.toString('MMMM');
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

    function customArrows(direction: 'left' | 'right') {
        if (direction === 'left') {
            return (
                <FontAwesomeIcon icon={faChevronLeft} style={styles.arrow} />
            )
        }

        return <FontAwesomeIcon icon={faChevronRight} style={styles.arrow} />
    }

    function Calendar(props?: CalendarProps & ContextProp) {
        return (
            <RNCalendar
                renderHeader={customHeader}
                renderArrow={customArrows}
                {...props}
            />
        );
    }

    return {
        Calendar,
        customArrows,
        customHeader
    }
}



const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    monthYearContainer: {
        alignItems: 'center',
    },
    monthText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    yearText: {
        color: 'white',
        fontSize: 15,
    },
    arrow: {
        color: 'white',
        fontSize: 20,
        paddingHorizontal: 10,
    },
});