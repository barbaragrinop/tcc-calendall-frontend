import { Button, Header, Input, LogoText } from "@/components";
import * as S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Classroom } from "@/components";
import { ActivityIndicator, FlatList, GestureResponderEvent, Keyboard, KeyboardAvoidingView, NativeSyntheticEvent, Platform, TextInputChangeEventData, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Classroom as TClassroom, Priority } from "@/types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Link, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { AddClassroom } from "./components/AddClassroom";
import { useFetchClassrooms } from "./hooks/useFetchClassrooms";



export function ClassroomScreen() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading } = useFetchClassrooms()
    const [filteredClassroomList, setFilteredClassroomList] = useState<TClassroom[]>([])
    const [search, setSearch] = useState<string>("")

    useEffect(() => {
        if (data) setFilteredClassroomList(data)
    }, [data])

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

    function handleOnChange(ev: NativeSyntheticEvent<TextInputChangeEventData>) {
        setSearch(ev.nativeEvent.text)
        const { text } = ev.nativeEvent
        if (!data) return

        const filtered = data?.filter((item) => item.sala.nome.toLowerCase().includes(text.toLowerCase()))
        setFilteredClassroomList(filtered)
    }

    return (
        <S.Wrap>
            <Header.ProfileInfo />
            <SafeAreaProvider>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <S.Container>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={{ flex: 1 }}
                        >

                            <S.TitleCreate>
                                <S.TitleScreen>SALAS</S.TitleScreen>
                                <Button.White
                                    title="criar sala"
                                    onPress={handleOpenModal}
                                />
                            </S.TitleCreate>
                            <AddClassroom
                                isCollapseOpen={isModalOpen}
                                handleCloseModal={handleCloseModal}
                            />
                            <S.Content>
                                <Input.Text
                                    icon={<FontAwesomeIcon icon={faMagnifyingGlass} color="white" size={20} />}
                                    placeholder="pesquise pelo nome da sala"
                                    onChange={handleOnChange}
                                    value={search}
                                />
                                <S.ClassroomList>
                                    {isLoading && <ActivityIndicator />}
                                    {data ? filteredClassroomList.map((item, index) => (
                                        <Link href={`/classroom/details/${[item.sala.id_sala, item.sala.nome]}`} key={index} onPress={() => {
                                            setSearch("")
                                            setFilteredClassroomList(data)
                                        }}>
                                            <S.ItensSeparator>
                                                <Classroom
                                                    funcaoUsuario={item.funcaoUsuario}
                                                    id_salaUsuario={item.id_salaUsuario}
                                                    sala={item.sala}
                                                    usuario={item.usuario}
                                                />
                                            </S.ItensSeparator>
                                        </Link>
                                    )) : (
                                        <S.TitleScreen>Ainda não há salas cadastradas!</S.TitleScreen>
                                    )}
                                </S.ClassroomList>
                            </S.Content>
                        </KeyboardAvoidingView>
                    </S.Container>
                </TouchableWithoutFeedback>
            </SafeAreaProvider>
        </S.Wrap>

    );
}
