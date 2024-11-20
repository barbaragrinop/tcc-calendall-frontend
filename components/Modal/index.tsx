
import { PropsWithChildren } from "react";
import { Pressable, Modal as RnModal, View, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as S from './style';

type Props = PropsWithChildren<{
    visible: boolean;
    closeModal: () => void;
    title?: string;
    hasHeader?: boolean;
}>;

export function Modal({ visible, closeModal, children, title, hasHeader = true }: Props) {
    return (
        <RnModal
            statusBarTranslucent
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <S.Container style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <S.Popup>
                    <S.CloseModalButton onPress={closeModal}>
                        <Ionicons name="close" size={24} color={"red"} />
                    </S.CloseModalButton>
                    {hasHeader && (
                        <S.HeaderSpace>
                            <S.Title> {title} </S.Title>
                        </S.HeaderSpace>
                    )}
                    <S.ScrollViewContainer>
                        {children}
                    </S.ScrollViewContainer>
                </S.Popup>
            </S.Container>
        </RnModal>
    );
}