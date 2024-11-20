import { useSession } from "@/app/contexts";
import { useHttpCommon } from "@/hooks";
import useSWR from "swr";

export function usePersonalCalendarService<T>() {

    const { session } = useSession()
    const { fetcher } = useHttpCommon()
    const { data, isLoading, mutate, error } = useSWR<T>(
        session?.id ?
            `/eventoPessoal/${session?.id}/buscarEventosPessoaisPorUsuario`
            : null,
        fetcher
    )

    return {
        data,
        isLoading,
        mutate,
        error
    }
}
