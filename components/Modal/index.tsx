
import { PropsWithChildren } from "react";
import { Modal as RnModal, ScrollView, TouchableWithoutFeedback, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as S from './style';

type Props = PropsWithChildren<{
    visible: boolean;
    closeModal: () => void;
    title: string;
}>;

export function Modal({ visible, closeModal, children, title }: Props) {
    return (
        <RnModal
            statusBarTranslucent
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={{ flex: 1, }}>
                <S.Container style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <S.Popup>
                        <S.CloseModalButton onPress={closeModal}>
                            <Ionicons name="close" size={24} color={"red"} />
                        </S.CloseModalButton>
                        <S.HeaderSpace>
                            <S.Title> {title} </S.Title>
                        </S.HeaderSpace>
                        <S.ScrollViewContainer>
                            <View style={{ paddingHorizontal: 20 }}>
                                {children}
                            </View>
                        </S.ScrollViewContainer>
                    </S.Popup>
                </S.Container>
            </View>
        </RnModal>
    );
}