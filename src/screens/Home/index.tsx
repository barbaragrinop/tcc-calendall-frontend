import profileNoPhoto from "../../assets/images/profile-nophoto.png";

import { Image, Text, View } from "react-native";
import * as S from "./style";
import { Header, LogoText } from "../../components";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../../constants/Colors";

export function Home() {
    return (
        <S.Container>
            <S.LogoSpace>
                <S.CalendallText>
                    <LogoText color="#fff" size={33} />
                </S.CalendallText>
                <S.Image
                    source={profileNoPhoto}
                    style={{ width: 30, height: 30 }}
                />
            </S.LogoSpace>
            <Calendar
            // theme={{
            //     backgroundColor: "#ffffff",
            //     calendarBackground: "#ffffff",
            //     textSectionTitleColor: "#b6c1cd",
            // }}
            />
        </S.Container>
    );
}
