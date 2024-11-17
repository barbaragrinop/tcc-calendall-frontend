import useSWRImmutable from "swr/immutable";

import { useSession } from "@/app/contexts";
import { useHttpCommon } from "@/hooks";

export function usePersonalCalendarService<T>() {
    const { session } = useSession()
    const { fetcher } = useHttpCommon()

    const { data, isLoading, mutate } = useSWRImmutable<T>(
        session?.id ? `/eventoPessoal/${session?.id}/buscarEventosPessoaisPorUsuario` : null, fetcher, {
        onError: (error) => {
            console.log('error', error)
        }
    })

    return {
        data, 
        isLoading, 
        mutate
    }
}
