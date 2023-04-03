import {Team} from "./Team";

export interface Project{
    id?: number;
    created?: Date;
    nameOfProject: string;
    clientName: string;
    budget: number;
    description: string;
    status: string;
    teams?: Team[];
}