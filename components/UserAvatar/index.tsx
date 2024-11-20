import * as S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { COLORS } from "@/constants";

interface UserAvatarProps {
    userName: string;
    isAdmin: boolean;
    size?: "sm" | "lg"; 
    gearColor?: string;  
    hasGear?: boolean
}

export function UserAvatar({
    userName,
    isAdmin,
    size = "sm",
    gearColor = COLORS.WHITE,  
    hasGear = true
}: UserAvatarProps) {
    const getInitials = (name: string): string => {
        const words = name.trim().split(" ");
        if (words.length === 1) {
            return words[0].slice(0, 2).toUpperCase();
        }
        return (
            words[0].charAt(0) + words[words.length - 1].charAt(0)
        ).toUpperCase();
    };

    const initials = getInitials(userName);

    const sizeConfig = {
        sm: {
            circleSize: 40,
            fontSize: 16,
            gearSize: 16,
        },
        lg: {
            circleSize: 60,
            fontSize: 24,
            gearSize: 24,
        },
    };

    const { circleSize, fontSize, gearSize } = sizeConfig[size];

    return (
        <S.AvatarWrap>
            <S.InitialsCircle style={{ width: circleSize, height: circleSize }}>
                <S.InitialsText style={{ fontSize }}>{initials}</S.InitialsText>
            </S.InitialsCircle>
            {isAdmin && hasGear && (
                <FontAwesomeIcon
                    icon={faGear}
                    size={gearSize}
                    style={{
                        position: "absolute",
                        bottom: -3,
                        right: -3,
                    }}
                    color={gearColor}
                />
            )}
        </S.AvatarWrap>
    );
}
