import { WeatherWidgetFull } from '@/types/forecasts-weather.type';
import { apiInstance } from './axios';

const ForecastsService = {
    getForecastsWeather: async (lat: number, lon: number) => {
        const response = await apiInstance.get<any>(`forecasts/weather/${lat}/${lon}`);
        return response.data;
    },
    getForecastsWeatherWidget: async (lat: number, lon: number) => {
        const response = await apiInstance.get<WeatherWidgetFull[]>(`forecasts/weather/${lat}/${lon}/widget`);
        return response.data;
    },
    getForecastsSolarRadiation: async (lat: number, lon: number) => {
        const response = await apiInstance.get<any>(`forecasts/solar-radiation/${lat}/${lon}`);
        return response.data;
    },
    getForecastsPVPower: async (lat: number, lon: number, dec: number, az: number, kwp: number) => {
        const response = await apiInstance.get<any>(`forecasts/pv-power/${lat}/${lon}/${dec}/${az}/${kwp}`);
        return response.data;
    },
};

export default ForecastsService;
