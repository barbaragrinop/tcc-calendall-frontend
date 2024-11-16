import { Header, Input, LogoText } from "@/components";
import * as S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Classroom } from "@/components";
import { FlatList, GestureResponderEvent, TouchableOpacity } from "react-native";
import { Classroom as TClassroom, Priority } from "@/types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Link, usePathname } from "expo-router";

const mockClassRooms: TClassroom[] = [
    {
        title: "Sala de Redes asd asd asd asd asd as",
        eventsQuantity: 3,
        membersQuantity: 10,
        isAdmin: true,
        idClassroom: "1",
    },
    {
        title: "Sala de Redes",
        eventsQuantity: 3,
        membersQuantity: 10,
        isAdmin: false,
        idClassroom: "2",
    }, {
        title: "Sala de Redes",
        eventsQuantity: 3,
        membersQuantity: 10,
        isAdmin: true,
        idClassroom: "3",
    }, {
        title: "Sala de Redes",
        eventsQuantity: 3,
        membersQuantity: 10,
        isAdmin: true,
        idClassroom: "4",
    }, {
        title: "Sala de Redes",
        eventsQuantity: 3,
        membersQuantity: 10,
        isAdmin: true,
        idClassroom: "5",
    }, {
        title: "Sala de Redes",
        eventsQuantity: 3,
        membersQuantity: 10,
        isAdmin: true,
        idClassroom: "6",
    }, {
        title: "Sala de Redes",
        eventsQuantity: 3,
        membersQuantity: 10,
        isAdmin: true,
        idClassroom: "7",
    }, {
        title: "Sala de Redes",
        eventsQuantity: 3,
        membersQuantity: 10,
        isAdmin: true,
        idClassroom: "8",
    },
    {
        title: "Sala de Redes",
        eventsQuantity: 3,
        membersQuantity: 10,
        isAdmin: true,
        idClassroom: "9",
    },
    {
        title: "Sala de Redes",
        eventsQuantity: 3,
        membersQuantity: 10,
        isAdmin: true,
        idClassroom: "10",
    },
    {
        title: "Sala de Redes",
        eventsQuantity: 3,
        membersQuantity: 10,
        isAdmin: true,
        idClassroom: "11",
    },
]

export function AddClassroomScreen() {

    return (
        <S.Wrap>
            <Header.ProfileInfo />
            <SafeAreaProvider>
                <S.Container>
                    <S.TitleCreate>
                        <S.TitleScreen>Criação de evento para calendário pessoal</S.TitleScreen>
                    </S.TitleCreate>
                    <S.Content>
                        <Input.Text
                            icon={<FontAwesomeIcon icon={faMagnifyingGlass} color="white" size={20} />}
                            placeholder="pesquise pelo nome da sala"
                        />
                        <S.ClassroomList>
                            <FlatList
                                data={mockClassRooms}
                                renderItem={({ item, index }) => (
                                    <Link href={`/classroom/details/${item.idClassroom}`}>
                                        <Classroom
                                            isAdmin={item.isAdmin}
                                            title={item.title}
                                            eventsQuantity={item.eventsQuantity}
                                            membersQuantity={item.membersQuantity}
                                            idClassroom={(index + 1).toString()}
                                        />
                                    </Link>
                                )}
                                keyExtractor={item => item.idClassroom}
                            />
                        </S.ClassroomList>
                    </S.Content>
                </S.Container>
            </SafeAreaProvider>
        </S.Wrap>
    );
}
