import { Classroom } from "./Classrooms"

export type ClassroomEvent = {
    id_evento: number,
    titulo: string
    descricao: string
    dt_evento: string
    ic_completa: boolean,
    sala: Classroom['sala']
    dt_criacao?: string
}