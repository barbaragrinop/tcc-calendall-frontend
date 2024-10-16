import { Input, LogoText } from "@/components";
import * as S from "./style";

export function ClassroomScreen() {
    return (
        <S.Wrap>
            <S.LogoSpace>
                <S.CalendallText>
                    <LogoText color="#fff" size={33} />
                </S.CalendallText>
                <S.Image
                    source={require("../../assets/images/profile-nophoto.png")}
                    style={{ width: 30, height: 30 }}
                />
            </S.LogoSpace>
            <S.Content>
                <S.TitleCreate>
                    <S.TitleScreen>SALAS</S.TitleScreen>
                    <S.ButtonCreateClassroom>
                        <S.TitleCreateClassroom>criar sala</S.TitleCreateClassroom>
                    </S.ButtonCreateClassroom>  
                </S.TitleCreate>
                <Input label="pesquise pelo nome da sala" placeholder="pesquise pelo nome da sala " required />
            </S.Content>
            
        </S.Wrap>
    );
}
