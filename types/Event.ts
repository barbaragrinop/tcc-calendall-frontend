import { Priority } from "./priority";

export type Event = {
    priority: "ALTA" | "MEDIA" | "BAIXA";
    time: string;
    date?: string;
    title: string;
    description: string;
    notificationType: string;
};