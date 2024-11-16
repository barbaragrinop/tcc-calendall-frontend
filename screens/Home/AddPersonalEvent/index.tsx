import { useModalHandler } from "@/hooks";
import { Pressable, ScrollView, Text, View, ViewStyle } from "react-native";
import * as S from './style'
import { Modalize } from "react-native-modalize";
import { Modal } from "@/components/Modal";

export function ModalAddPersonalEvent() {
    const { closeModal, isModalVisible, openModal } = useModalHandler()


    return (
        <>
            <S.ButtonSpace>
                <S.ButtonWhite
                    onPress={openModal}
                    title="criar evento"
                />
            </S.ButtonSpace >
            <Modal visible={isModalVisible} closeModal={closeModal} title="Tasdasdasdasddasdasdaseste modal">
                <Text>kajsdkjashd lkjashd lkjashd </Text>
                <Text>kajsdkjashd lkjashd lkjashd </Text>
                <Text>kajsdkjashd lkjashd lkjashd </Text>
                <Text>kajsdkjashd lkjashd lkjashd </Text>
                <Text>kajsdkjashd lkjashd lkjashd </Text>
                <Text>kajsdkjashd lkjashd lkjashd </Text>
                <Text>kajsdkjashd lkjashd lkjashd </Text>
                <Text>kajsdkjashd lkjashd lkjashd </Text>
                <Text>kajsdkjashd lkjashd lkjashd </Text>
                
            </Modal>

        </>
    )
}