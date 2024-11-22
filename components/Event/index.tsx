import * as S from "./style";

import { useState } from "react";

import { Priority } from "@/types";
import { COLORS } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { EllipsisIcon } from "../EllipsisIcon";
import { format } from "date-fns";
import { Button } from "../Button";
import { AddEventToPersonalCalendar } from "./AddEventToPersonalCalendar";

type PersonalProps = {
    priority: "ALTA" | "MEDIA" | "BAIXA";
    time: string;
    date?: string;
    title: string;
    description: string;
    notificationType: string;
    origin: string
};

function PersonalEvent(props: PersonalProps) {
    const { description, priority, time, title, notificationType, date, origin } =
        props;

    const [open, setIsOpen] = useState<boolean>(false);

    function getColorBasedOnPriority() {
        if (priority === "ALTA") {
            return COLORS.RED_PRIORITY_HIGH;
        }
        if (priority === "MEDIA") {
            return COLORS.YELLOW_PRIORITY_MEDIUM;
        }
        return COLORS.GREY_PRIORITY_LOW;
    }

    function getLabelPriority() {
        if (priority === "ALTA") {
            return "Alta";
        }
        if (priority === "MEDIA") {
            return "Media";
        }

        return "Baixa";
    }

    return (
        <S.Container>
            <S.EventClose $isOpen={open}>
                <S.Date $priorityColor={getColorBasedOnPriority()}>
                    {date && <S.EventDate>{date}</S.EventDate>}
                    <S.EventTime>{time}</S.EventTime>
                </S.Date>
                <S.EventCloseDetails>
                    <S.EventTitle numberOfLines={1}>{title}</S.EventTitle>
                    {open ? (
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: COLORS.GREY_DARK_TEXT,
                                    marginRight: 5,
                                }}
                            >
                                criado em:
                            </Text>
                            <Text>{origin}</Text>
                        </View>
                    ) : (
                        <S.EventDescription numberOfLines={1}>
                            {description}
                        </S.EventDescription>
                    )}
                </S.EventCloseDetails>
                <S.IconSpace onPress={() => setIsOpen(!open)}>
                    {open ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                        <EllipsisIcon height={30} width={30} />
                    )}
                </S.IconSpace>
            </S.EventClose>
            {open && (
                <View
                    style={{
                        padding: 20,
                        marginTop: 4,
                        display: "flex",
                        flex: 1,
                    }}
                >
                    <View style={{ marginBottom: 30 }}>
                        <Text style={{ fontSize: 14, marginBottom: 5 }}>
                            descrição
                        </Text>
                        <Text style={{ fontSize: 17 }}>{description}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <S.EventTopic>prioridade:</S.EventTopic>
                            <Text>{getLabelPriority()}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <S.EventTopic> notificação: </S.EventTopic>
                            <Text>{notificationType}</Text>
                        </View>
                    </View>
                </View>
            )}
        </S.Container>
    );
}

type ClassroomProps = Omit<PersonalProps, "priority" | "notificationType"> & {
    datetime?: string
    id?: number
    createdAt: string
};

function ClassroomEvent(props: ClassroomProps) {
    const { description, time, title, date, datetime, createdAt } =
    props;
     
    const [open, setIsOpen] = useState<boolean>(false);


    return (
        <S.Container>
            <S.EventClose $isOpen={open}>
                <S.Date $priorityColor={COLORS.GREY_PRIORITY_LOW}>
                    {date && <S.EventDate>{date}</S.EventDate>}
                    <S.EventTime>{time}</S.EventTime>
                </S.Date>
                <S.EventCloseDetails>
                    <S.EventTitle numberOfLines={1}>{title}</S.EventTitle>

                    <S.EventDescription numberOfLines={1}>
                        {description}
                    </S.EventDescription>

                </S.EventCloseDetails>
                <S.IconSpace onPress={() => setIsOpen(!open)}>
                    {open ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                        <EllipsisIcon height={30} width={30} />
                    )}
                </S.IconSpace>
            </S.EventClose>
            {open && (
                <View
                    style={{
                        padding: 20,
                        marginTop: 4,
                        display: "flex",
                        flex: 1,
                    }}
                >
                    <View style={{ marginBottom: 30 }}>
                        <Text style={{ fontSize: 14, marginBottom: 5 }}>
                            descrição
                        </Text>
                        <Text style={{ fontSize: 17 }}>{description}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <S.EventTopic>criado em:</S.EventTopic>
                            <Text>{format(new Date(createdAt), "dd MMM yyyy - HH'h'mm")}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            paddingTop: 40
                        }}

                    >
                        {date && datetime && props.id &&(
                            <AddEventToPersonalCalendar
                                datetime={datetime}
                                description={description}
                                title={title}
                                eventId={props.id}
                            />
                        )}
                    </View>
                </View>
            )}
        </S.Container>
    );
}

export const Event = {
    Personal: PersonalEvent,
    Classroom: ClassroomEvent
}
