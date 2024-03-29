export interface PowerPlantRes {
    _id: string;
    powerPlants: PowerPlant[];
}

export interface PowerPlant {
    displayName: string;
    latitude: number;
    longitude: number;
    power: number;
    predictedProduction: number;
    _id: string;
    calibration: Calibration[];
}

export interface PowerPlantProduction {
    power: number;
    powerPlantId: string;
    predictedPower: number;
    solar: number;
    timestamp: string;
}

export interface PowerPlantCreateReq {
    displayName: string;
    latitude: number;
    longitude: number;
}

export interface PowerPlantCalibrationReq {
    power: number;
}

export interface PowerPlantUpdateReq {
    displayName: string;
    latitude: number;
    longitude: number;
}

export interface CalibrationReq {
    power: number;
}

interface Calibration {
    value: number | undefined;
    date: string;
}

export interface PredictedValue {
    date: string;
    power: number;
}

export interface PowerPlantStatistics {
    now: number;
    before: number;
    type: Statistics;
}

export enum PowerPlantType {
    Custom = 0,
    Small = 1,
    Medium = 2,
    Big = 3,
}

export enum Statistics {
    today = 'today',
    week = 'week',
    month = 'month',
    year = 'year',
}
