import * as S from "./style";


import { Classroom as TClassroom } from "@/types";
import { faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS } from "@/constants";


export function ClassroomItem(props: TClassroom) {

    const {
        id_salaUsuario,
        isAdmin,
        sala
    } = props

    return (
        <S.Container>
            <S.EventClose>
                <S.Role $isAdmin={isAdmin}>
                    <S.ClasroomID>{"#"}{id_salaUsuario}</S.ClasroomID>
                    {isAdmin && <S.Admin>Admin</S.Admin>}
                </S.Role>
                <S.ClassroomDetails>
                    <S.Title numberOfLines={1}>{sala.nome}</S.Title>
                    <S.Info>
                        <S.QuantityMembersSpace>
                            <FontAwesomeIcon icon={faUser} />
                            <S.QuantityMembers>{sala.qt_membros} membros</S.QuantityMembers>
                        </S.QuantityMembersSpace>
                        <S.QuantityEventsSpace>
                            <FontAwesomeIcon icon={faCalendar} />
                            <S.QuantityEvents>{sala.qt_eventos} eventos</S.QuantityEvents>
                        </S.QuantityEventsSpace>
                    </S.Info>
                </S.ClassroomDetails>
                <S.IconArrowSpace>
                    <FontAwesomeIcon icon={faChevronRight} size={35} color={COLORS.BLUE_PRIMARY} />
                </S.IconArrowSpace>
            </S.EventClose>
        </S.Container>
    );
}
