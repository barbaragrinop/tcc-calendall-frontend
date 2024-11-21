import { UserPT } from "./User"

export type Classroom = {
    id_salaUsuario: string,
    usuario: UserPT, 
    funcaoUsuario: "REPRESENTANTE" | "VICE_REPRESENTANTE" | "ALUNO",
    sala: {
        id_sala: number,
        nome: string,
        descricao: string,
        dt_criacao: string, 
        qt_eventos: number,
        qt_membros: number,
    }, 
    isAdmin: true
}