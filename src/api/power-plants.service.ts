import { apiInstance } from './axios';
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
    return response.data;
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
  }
};

export default PowerPlantsService;
