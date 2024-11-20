import useSWR from "swr"

import { useHttpCommon } from "@/hooks"
import { ClassroomMember } from "@/types/ClassroomMember"

export function useFetchClassroomMembersByClassroomId(idClassroom: number) {

    const { fetcher } = useHttpCommon()

    const { data, isLoading, mutate } = useSWR<ClassroomMember[]>(
        idClassroom ?
            `/sala/${idClassroom}/listarUsuariosSala/` :
            null,
        fetcher)

    return {
        data,
        isLoading,
        mutate
    }
}

// /sala/1/listarUsuariosSala/