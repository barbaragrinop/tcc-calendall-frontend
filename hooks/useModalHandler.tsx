import { useRef, useState } from "react"
import { Modalize } from "react-native-modalize"
import { Modal as ModalRN, Text } from "react-native"

export function useModalHandler() {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const openModal = () => {
        setIsModalVisible(true)
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

    const Modal = () => {
        return (
            <>
                <ModalRN animationType="slide" transparent={true} visible={isModalVisible}>
                    <Text>asdaksm dçlaksj dalçksjd </Text>
                </ModalRN>
            </>
        )
    }

    return {
        setIsModalVisible,
        isModalVisible,
        openModal,
        closeModal, 
        Modal
    }
}