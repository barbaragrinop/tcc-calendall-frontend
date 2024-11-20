import { Classroom } from "./Classrooms"
import { UserPT } from "./User"

export type ClassroomMember = {
    id_SalaUsuario: number,
    sala: Classroom['sala'],
    usuario: UserPT
    funcaoUsuario: "REPRESENTANTE" | "VICE_REPRESENTANTE" | "ALUNO",
}