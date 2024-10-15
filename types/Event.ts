import { Priority } from "./priority";

export type Event = {
    priority: Priority;
    time: string;
    date?: string;
    title: string;
    description: string;
    notificationType: string;
};