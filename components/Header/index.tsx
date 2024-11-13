import * as S from './style'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '@/constants/_colors';
import { LogoText } from '../Logo/Text';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

type Props = {
    backIcon?: boolean
    title: string
}


function HeaderBackButton({ title, backIcon = true }: Props) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
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



    return (
        <S.LogoSpace>
            <S.CalendallText>
                <LogoText color="#fff" size={33} />
            </S.CalendallText>
            <S.Image
                source={require("../../assets/images/profile-nophoto.png")}
                style={{ width: 30, height: 30 }}
            />
        </S.LogoSpace>
    )
}

export const Header = {
    BackButton: HeaderBackButton,
    ProfileInfo: HeaderProfileInfo
}