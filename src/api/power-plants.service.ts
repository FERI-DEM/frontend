import { apiInstance, datastaxInstance } from './axios';
import {
  CalibrationReq,
  PredictedValue,
  PowerPlantCreateReq,
  PowerPlantRes,
  PowerPlantUpdateReq,
} from '../types/power-plant.type';

const PowerPlantsService = {
  getPowerPlants: async () => {
    const response = await apiInstance.get<PowerPlantRes>('power-plants');
    return response.data.powerPlants;
  },
  getPowerPlant: async (id: string) => {
    const response = await apiInstance.get<PowerPlantRes>(`power-plants/${id}`);
    return response.data.powerPlants[0];
  },
  calibration: async (calibration: CalibrationReq) => {
    const response = await apiInstance.post<PowerPlantRes>(`power-plants/calibrate/${calibration.id}`, {
      power: calibration.power,
    });
    return response.data;
  },
  getPrediction: async (id: string) => {
    const response = await apiInstance.get<PredictedValue[]>(`power-plants/predict/${id}`);
    return response.data;
  },
  createPowerPlant: async (powerPlant: PowerPlantCreateReq) => {
    const response = await apiInstance.post(`power-plants`, powerPlant);
    return response.data;
  },
  updatePowerPlant: async (id: string, powerPlant: PowerPlantUpdateReq) => {
    const response = await apiInstance.patch(`power-plants/${id}`, powerPlant);
    return response.data;
  },
  deletePowerPlant: async (id: string) => {
    const response = await apiInstance.delete<PowerPlantRes>(`power-plants/${id}`);
    return response.data.powerPlants;
  },
  getPowerPlantProduction: async (id: string) => {
    const response = await datastaxInstance.get(
      `v2/keyspaces/w4c/power_plants_history?where=${encodeURIComponent(`{"power_plant_id": {"$in": ["${id}"]}}`)}&page-size=20000`
    );
    return response.data.data;
  },
};

export default PowerPlantsService;
