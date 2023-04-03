import {Project} from "./Project";

export interface Team{
    id?: number;
    created?: Date;
    nameOfTeam: string;
    freePlaces: number;
    purpose: string;
    admin: string;
    rating: number;
    projects?: Project[];
}