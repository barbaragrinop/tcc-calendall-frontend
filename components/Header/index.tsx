import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as S from './style'
import { faArrowLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '@/constants/_colors';

type Props = {
    backIcon?: boolean
    title: string
}

export default function Header({ title, backIcon = true }: Props) {
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
