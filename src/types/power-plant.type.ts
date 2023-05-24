export interface PowerPlantRes {
    _id: string;
    powerPlants: PowerPlant[];
}

export interface PowerPlant {
    displayName: string;
    latitude: number;
    longitude: number;
    maxPower: number;
    size: number;
    coefficient: number;
    predictedProduction: number;
    _id: string;
    calibration: Calibration[];
}

export interface PowerPlantProduction {
    id: string;
    power: number;
    power_plant_id: string;
    predicted_power: number;
    solar: number;
    timestamp: string;
}

export interface PowerPlantCreateReq {
    displayName: string;
    latitude: number;
    longitude: number;
    maxPower: number;
    size: number;
}

export interface PowerPlantUpdateReq {
    displayName: string;
    latitude: number;
    longitude: number;
    maxPower: number;
    size: number;
}

export interface CalibrationReq {
    power: number;
}

interface Calibration {
    power: number;
    date: string;
    radiation: number;
}

export interface PredictedValue {
    date: string;
    power: number;
}

export enum PowerPlantType {
    Custom = 0,
    Small = 1,
    Medium = 2,
    Big = 3,
}
