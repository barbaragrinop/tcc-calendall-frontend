import useSWR from "swr"

import { useSession } from "@/app/contexts"
import { useHttpCommon } from "@/hooks"
import { ClassroomEvent } from "@/types/ClassroomEvent"

export function useFetchMembersByClassroomId(idClassroom: number) {
    const { fetcher } = useHttpCommon()

    const { data, isLoading, mutate } = useSWR<ClassroomEvent[]>(
        idClassroom ?
            `/sala/${idClassroom}/listarUsuariosSala` :
            null, fetcher
    )

    return {
        data,
        isLoading,
        mutate
    }
}