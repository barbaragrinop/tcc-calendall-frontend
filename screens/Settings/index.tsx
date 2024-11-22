import { Button, Header, Input, LogoText } from "@/components";
import * as S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faBell, faChevronRight, faKey, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Classroom } from "@/components";
import { ActivityIndicator, FlatList, GestureResponderEvent, Keyboard, KeyboardAvoidingView, NativeSyntheticEvent, Platform, TextInputChangeEventData, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Classroom as TClassroom, Priority } from "@/types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Link, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { COLORS } from "@/constants";
// import { ChangePassword } from "./components/ChangePassword";



export function SettingsScreen() {

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
                                <S.TitleScreen>CONFIGURAÇÕES</S.TitleScreen>
                            </S.TitleCreate>

                            <S.ListOptions>
                                <Link href="/(auth)/(tabs)/settings/change-password">
                                    <S.Item style={{
                                        backgroundColor: COLORS.BLUE_3,
                                    }}>
                                        <FontAwesomeIcon icon={faKey} size={20} color="#fff" />
                                        <S.ItemText>Alterar Senha</S.ItemText>
                                    </S.Item>
                                </Link>
                                <S.Item style={{
                                    backgroundColor: COLORS.BLUE_3,
                                }}>
                                    <FontAwesomeIcon icon={faBell} size={20} color="#fff" />
                                    <S.ItemText>Gerenciar Notificações</S.ItemText>
                                </S.Item>
                            </S.ListOptions>

                        </KeyboardAvoidingView>
                    </S.Container>
                </TouchableWithoutFeedback>
            </SafeAreaProvider>
        </S.Wrap>

    );
}
