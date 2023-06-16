import { PowerPlant } from './power-plant.type';

export interface User {
    _id: string;
    email: string;
    userId: string;
    roles: string[];
    powerPlants: PowerPlant[];
}

export interface Me {
    id: string;
    email: string;
    userId: string;
    roles: string[];
}
