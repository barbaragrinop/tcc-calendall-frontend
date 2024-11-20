import useSWR from "swr"

import { useHttpCommon } from "@/hooks"
import { ClassroomEvent } from "@/types/ClassroomEvent"

export function useFetchClassroomEventsbyClassroomId(idClassroom: number) {
    const { fetcher } = useHttpCommon()
    
    const { data, isLoading, mutate } = useSWR<ClassroomEvent[]>(
        idClassroom ?
            `/eventoSala/${idClassroom}/listarEventos` :
            null,
        fetcher)

    return {
        data,
        isLoading,
        mutate
    }
}