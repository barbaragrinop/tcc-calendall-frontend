import useSWR from "swr";

import { useSession } from "@/app/contexts";
import { useHttpCommon } from "@/hooks";
import { Classroom } from "@/types";

export function useFetchClassrooms() {
    const { session } = useSession() 
    const { fetcher } = useHttpCommon()
    const { data, isLoading, mutate } = useSWR<Classroom[]>(
        session ?
            `/usuario/${session?.id}/salasListagem` :
            null,
        fetcher)

    return {
        data,
        isLoading,
        mutate
    }
}
