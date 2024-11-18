import * as S from './style';
import profileImage from '../../../assets/images/profile-nophoto.png';

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header, Tabs, Event, Breadcrumb } from "@/components";
import { format } from "date-fns";
import { useCalendar } from "@/hooks";
import { COLORS, } from "@/constants";
import { ClassroomMembers, Priority, Event as TEvent } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { ptBR } from "date-fns/locale";
import { FlatList, View } from 'react-native';


export function ClassroomDetailsScreen() {
    const { Calendar } = useCalendar();
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

    const today = format(new Date(), "dd/MMM", { locale: ptBR });

    const nomeSalas = 'Winx Club';

    const todayEvents: TEvent[] = [
        {
            notificationType: "a cada dia",
            priority: Priority.ALTA,
            time: "14h30",
            date: (new Date().getDate() + 1).toString(),
            title: "Seminario Redes",
            description: "çlkasdkjasdlkjlksajdlkasjd",
        },
        {
            notificationType: "a cada semana",
            priority: Priority.BAIXA,
            time: "14h30",
            date: "23/10",
            title: "Apresentação do Joseffe",
            description:
                "Falar com a Bruna e com a Nathalia pra conseguir montar apresentação e também ajudar no backend do tcc. levar o doc pra secretaria",
        },
        {
            notificationType: "a cada 2 horas",
            priority: Priority.MEDIA,
            time: "14h30",
            date: "24/10",
            title: "Seminario Redes",
            description: "çlkasdkjasdlkjlksajdlkasjd",
        },
        {
            notificationType: "a cada dia",
            priority: Priority.ALTA,
            time: "14h30",
            date: "25/10",
            title: "Seminario Redes",
            description: "çlkasdkjasdlkjlksajdlkasjd",
        },
    ];

    const membersList: ClassroomMembers[] = [
        {
            id: 1,
            name: 'Stella',
            image: profileImage,
            role: 'admin'
        },
        {
            id: 2,
            name: 'Bloom',
            image: profileImage,
            role: 'admin'
        },
        {
            id: 3,
            name: 'Flora',
            image: profileImage,
            role: 'Common'
        },
        {
            id: 4,
            name: 'Musa',
            image: profileImage,
            role: 'Common'
        },
        {
            id: 5,
            name: 'Tecna',
            image: profileImage,
            role: 'Common'
        },
        {
            id: 6,
            name: 'Aisha',
            image: profileImage,
            role: 'Common'
        },
        {
            id: 7,
            name: 'Sky',
            image: profileImage,
            role: 'Common'
        },
        {
            id: 8,
            name: 'Brandon',
            image: profileImage,
            role: 'Common'
        },
        {
            id: 9,
            name: 'Riven',
            image: profileImage,
            role: 'Common'
        },
        {
            id: 10,
            name: 'Timmy',
            image: profileImage,
            role: 'Common'
        },
        {
            id: 11,
            name: 'Helia',
            image: profileImage,
            role: 'Common'
        },
        {
            id: 12,
            name: 'Nabu',
            image: profileImage,
            role: 'Common'
        },
    ];

    return (
        <S.Wrap>
            <Header.ProfileInfo />
            <SafeAreaProvider>
                <S.Container>
                    <S.TitleCreate>
                        <Breadcrumb dividedPath={['salas', nomeSalas]} />
                    </S.TitleCreate>
                    <S.Content>
                        <Calendar
                            style={{
                                backgroundColor: COLORS.BLUE_SECONDARY,
                                paddingTop: 20,
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
                                calendarBackground: COLORS.BLUE_SECONDARY,
                                dayTextColor: "white",
                            }}
                        />

                        <S.Members>
                            <S.MembersTitle>integrantes</S.MembersTitle>
                            <S.MembersList>
                                {membersList.map(({ image, role }, index) => (
                                    <S.ImageWrap key={index}>
                                        <S.Image
                                            key={index}
                                            // @ts-ignore
                                            source={image}
                                            style={{ width: 30, height: 30 }}
                                        />
                                        {role === "admin" && (
                                            <FontAwesomeIcon
                                                icon={faGear}
                                                style={{
                                                    position: "absolute",
                                                    bottom: -4,
                                                    right: -4
                                                }}
                                                color={COLORS.GOLD_DARK}
                                            />
                                        )}
                                    </S.ImageWrap>
                                ))}
                            </S.MembersList>
                        </S.Members>
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
                                                {todayEvents.map((event, index) => (
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
                                                {nextEvents.map((event, index) => (
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
                    </S.Content>
                </S.Container>
            </SafeAreaProvider>
        </S.Wrap>
    );
}
