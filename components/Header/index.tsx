import * as S from './style'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '@/constants/_colors';
import { LogoText } from '../Logo/Text';
import { useState } from 'react';
import { TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/app/contexts';
import { Dropdown } from '../Dropdown';
import { DropdownOptions } from '@/types';

type Props = {
    backIcon?: boolean
    title: string
}


function HeaderBackButton({ title, backIcon = true }: Props) {
    return (
        <TouchableOpacity onPress={router.back}>
            <S.Header>
                {backIcon && (
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size={23}
                        color={COLORS.BLUE_TERTIARY}
                    />
                )}
                <S.HeaderTitle>{title}</S.HeaderTitle>
            </S.Header>
        </TouchableOpacity>
    );
}

function HeaderProfileInfo() {
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false)

    const { signOut } = useSession();

    const toggleOptions = () => setIsOptionsOpen((prev) => !prev);
    const closeOptions = () => setIsOptionsOpen(false);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
                closeOptions();
            }}
        >
            <S.LogoSpace>
                <S.CalendallText>
                    <LogoText color="#fff" size={33} />
                </S.CalendallText>
                <Pressable onPress={toggleOptions}>
                    <S.Image
                        source={require("../../assets/images/profile-nophoto.png")}
                        style={{ width: 30, height: 30 }}
                    />
                </Pressable>

                {isOptionsOpen && (
                    <Dropdown items={[
                        {
                            title: "Perfil",
                            action: () => console.log("perfil building")
                        },
                        {
                            title: "Sair",
                            action: () => signOut()
                        }
                    ]} />
                )}

            </S.LogoSpace>
        </TouchableWithoutFeedback>
    )
}

export const Header = {
    BackButton: HeaderBackButton,
    ProfileInfo: HeaderProfileInfo
}