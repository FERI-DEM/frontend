import ForecastsService from '@/api/forecasts.service';
import { CacheKey } from '@/types/caching.types';
import { ApiResponseError } from '@/types/common.types';
import { WeatherWidgetFull } from '@/types/forecasts-weather.type';
import useSWR from 'swr';

const useForecastsWeather = (latitude?: number, longitude?: number) => {
    const { data, error, isLoading } = useSWR<WeatherWidgetFull[], ApiResponseError>(
        () => (latitude && longitude ? `${CacheKey.FORECASTS_WEATHER}_${latitude}_${longitude}` : undefined),
        () => ForecastsService.getForecastsWeatherWidget(latitude!, longitude!)
    );

    if (error?.response?.data?.statusCode === 403) {
        return {};
    }

    return {
        forecastsWeather: data,
        forecastsWeatherError: error,
        forecastsWeatherLoading: isLoading,
    };
};

export default useForecastsWeather;
