import * as S from './style'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '@/constants/_colors';
import { LogoText } from '../Logo/Text';
import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

type Props = {
    backIcon?: boolean
    title: string
}


function HeaderBackButton({ title, backIcon = true }: Props) {
    return (
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
    );
}

function HeaderProfileInfo() {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    const headerOptionsItems: { title: string, onPress: () => void }[] = [
        {
            title: 'Perfil',
            onPress: () => console.log('Perfil')
        },
        {
            title: 'Sair',
            onPress: () => console.log('Sair')
        }
    ]


    return (
        <S.LogoSpace>
            <S.CalendallText>
                <LogoText color="#fff" size={33} />
            </S.CalendallText>
            <TouchableOpacity
                onPress={() => setIsDropdownOpen(true)}
                onBlur={() => setIsDropdownOpen(false)}
            >
                <S.Image
                    source={require("../../assets/images/profile-nophoto.png")}
                    style={{ width: 30, height: 30 }}
                />
            </TouchableOpacity>
            {isDropdownOpen && (
                <S.HeaderOptinonsSpace>
                    <FlatList
                        data={headerOptionsItems}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={item.onPress}>
                                <S.HeaderTitle>{item.title}</S.HeaderTitle>
                            </TouchableOpacity>
                        )}
                    />
                </S.HeaderOptinonsSpace>
            )}

        </S.LogoSpace>
    )
}

export const Header = {
    BackButton: HeaderBackButton,
    ProfileInfo: HeaderProfileInfo
}