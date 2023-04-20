export interface PowerPlantRes {
  _id: string;
  powerPlants: PowerPlant[];
}

export interface PowerPlant {
  displayName: string;
  latitude: number;
  longitude: number;
  coefficient: number;
  predictedProduction: number;
  _id: string;
  calibration: Calibration[];
}

export interface PowerPlantCreateReq {
  displayName: string;
  latitude: number;
  longitude: number;
}

export interface CalibrationReq {
  id: string;
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
