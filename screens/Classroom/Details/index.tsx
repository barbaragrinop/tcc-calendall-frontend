import { View, Text, FlatList } from "react-native";
import { Link, useLocalSearchParams } from "expo-router"
import * as S from './style'
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Classroom, Header, Input } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@/components/Breadcrumb";

export function ClassroomDetailsScreen() {
    const { id } = useLocalSearchParams(); // Obtém o ID da sala da URL

    return (
        <S.Wrap>
            <Header.ProfileInfo />
            <SafeAreaProvider>
                <S.Container>
                    <S.TitleCreate>
                        <Breadcrumb />
                    </S.TitleCreate>
                    <S.Content>
                        
                    </S.Content>
                </S.Container>
            </SafeAreaProvider>
        </S.Wrap>
    );
}