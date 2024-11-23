import * as S from './style'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '@/constants/_colors';
import { LogoText } from '../Logo/Text';
import { useState } from 'react';
import { TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/app/contexts';
import { Dropdown } from '../Dropdown';
import { DropdownOptions } from '@/types';
import { UserAvatar } from '../UserAvatar';

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
    const { signOut, session } = useSession();

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
                    <View style={{ marginRight: 30 }}>
                        <UserAvatar
                            isAdmin={false}
                            userName={session?.nome || "NA"}
                            size='sm'
                        />
                    </View>
                </Pressable>

                {isOptionsOpen && (
                    <Dropdown items={[
                        
                        {
                            title: "Sair",
                            action: () => signOut()
                        }
                    ]} />
                )}

            </S.LogoSpace>
        </TouchableWithoutFeedback >
    )
}

export const Header = {
    BackButton: HeaderBackButton,
    ProfileInfo: HeaderProfileInfo
}