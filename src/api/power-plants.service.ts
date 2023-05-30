import { apiInstance } from './axios';
import {
    PredictedValue,
    PowerPlantCreateReq,
    PowerPlantRes,
    PowerPlantUpdateReq,
    PowerPlantProduction,
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
    calibration: async (powerPlantId: string, power: number) => {
        const response = await apiInstance.post<PowerPlantRes>(`power-plants/calibrate/${powerPlantId}`, {
            power: power,
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
    getPowerPlantProduction: async (powerPlantIds: string[], dateFrom?: Date, dateTo?: Date) => {
        const response = await apiInstance.get<PowerPlantProduction[]>(
            `power-plants/history?${powerPlantIds.map((powerPlantId) => `powerPlantIds=${powerPlantId}`).join('&')}${
                dateFrom ? `&dateFrom=${dateFrom}` : ``
            }${dateTo ? `&dateTo=${dateTo}` : ``}`
        );
        return response.data;
    },
};

export default PowerPlantsService;
