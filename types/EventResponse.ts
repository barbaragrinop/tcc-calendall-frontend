export type EventResponse = {
    nm_origem: string;
    evento: {
        descricao: string;
        dt_evento: string;
        ic_completa: boolean;
        id_evento: number;
        titulo: string;
    };
    id: number;
    tipoNotificacao: string;
    tipoPrioridade: "ALTA" | "MEDIA" | "BAIXA";
    usuario: {
        dt_nascimento: string;
        email: string;
        id_usuario: number;
        nome: string;
        senha: string;
    };
}
