import { WeatherWidgetFull } from '@/types/forecasts-weather.type';
import { Key, useEffect, useState } from 'react';

interface WeatherForecastProps {
    weather: WeatherWidgetFull[];
}

const WeatherForecast = ({ weather }: WeatherForecastProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const getCurrentImageAndDescription = (weatherItem: WeatherWidgetFull): string | void => {
        weatherItem.hourlyDataInterval?.weatherCode.forEach((weathercode, index) => {
            if (new Date(weatherItem.hourlyDataInterval.time[index]).getHours() === new Date().getHours()) {
                const index = weatherItem.hourlyDataInterval.weatherCode.indexOf(weathercode);
                setCurrentIndex(index);
            }
        });
    };

    useEffect(() => {
        weather.forEach((weatherItem) => {
            getCurrentImageAndDescription(weatherItem);
        });
    });

    return (
        <div className="weather-forecast inline-flex">
            {weather.map((weatherItem: WeatherWidgetFull, index: Key | null | undefined) => (
                <div className="forecast p-5 text-center" key={index}>
                    <div className="forecast-header">
                        <div className="day">
                            {new Date(weatherItem.sunrise).toLocaleDateString('sl-SI', {
                                weekday: 'short',
                            })}
                        </div>
                    </div>
                    <div className="forecast-content">
                        <div className="forecast-icon inline-flex">
                            <img
                                src={weatherItem.hourlyDataInterval?.image[currentIndex]}
                                width={48}
                                height={48}
                                alt="Weather icon"
                            />
                        </div>
                        <div className={`${'text-red-500'}`}>{weatherItem.temperature_2m_max}°C</div>
                        <div className={`${'text-blue-500'}`}>{weatherItem.temperature_2m_min}°C</div>
                        <small>{weatherItem.hourlyDataInterval?.description[currentIndex]}</small>
                    </div>
                </div>
            ))}
        </div>
    );
};

export { WeatherForecast };
