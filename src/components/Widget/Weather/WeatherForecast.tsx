import { Key } from "react";
import { WeatherWidgetFull } from "./WeatherWidget";

interface WeatherForecastProps {
  weather: WeatherWidgetFull[];
}

const WeatherForecast = ({ weather }: WeatherForecastProps) => {
  return (
    <div className="weather-forecast inline-flex">
      {weather.map((weatherItem: WeatherWidgetFull, index: Key | null | undefined) => (
        <div className="forecast p-5" key={index}>
          <div className="forecast-header">
            <div className="day">
              {new Date(weatherItem.sunrise).toLocaleDateString('sl-SI', {
                weekday: 'short',
              })}
            </div>
          </div>
          <div className="forecast-content">
            <div className="forecast-icon inline-flex">
              <img src={weatherItem.image} width={48} height={48} alt="Weather icon" />
            </div>
            <div className={`${'text-red-500'}`}>
              {weatherItem.temperature_2m_max}°C
            </div>
            <div className={`${'text-blue-500'}`}>
              {weatherItem.temperature_2m_min}°C
            </div>
            <small>{weatherItem.description}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export { WeatherForecast };
