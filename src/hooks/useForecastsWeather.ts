import ForecastsService from '@/api/forecasts.service';
import { CacheKey } from '@/types/caching.types';
import { ApiError } from '@/types/common.types';
import { WeatherWidgetFull } from '@/types/forecasts-weather.type';
import useSWR from 'swr';

const useForecastsWeather = (latitude?: number, longitude?: number) => {
    const { data, error, isLoading } = useSWR<WeatherWidgetFull[], ApiError>(
        () => (latitude && longitude ? `${CacheKey.FORECASTS_WEATHER}_${latitude}_${longitude}` : undefined),
        () => ForecastsService.getForecastsWeatherWidget(latitude!, longitude!)
    );

    return {
        forecastsWeather: data,
        forecastsWeatherError: error,
        forecastsWeatherLoading: isLoading,
    };
};

export default useForecastsWeather;
