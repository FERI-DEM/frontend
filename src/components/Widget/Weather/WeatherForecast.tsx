import ForecastsService from "@/api/forecasts.service";
import PowerPlantsService from "@/api/power-plants.service";
import Image from "next/image";
import { useEffect, useState } from "react";

interface WeatherWidget {
    weathercode: number;
    temperature_2m_max: number;
    temperature_2m_min: number;
    sunrise: string;
    sunset: string;
  }
  
interface WeatherWidgetFull extends WeatherWidget {
    description: string;
    image: string;
}

const WeatherForecast = () => {

    const [weather, setWeather] = useState<WeatherWidgetFull[]>([]);

    useEffect(() => {
        const fetchWeather = async () => {
            const powerPlants = await PowerPlantsService.getPowerPlants();
            powerPlants.forEach(async (powerPlant) => {
                const data = await ForecastsService.getForecastsWeatherWidget(powerPlant.latitude, powerPlant.longitude);
                if (data.length > 3)
                    //data.splice(3);
                setWeather(data);
            });
        }
        fetchWeather();
    }, []);

  return (
    <div className="weather-forecast inline-flex">
      {weather.map((weather, index) => (
        <div className="forecast p-5" key={index}>
          <div className="forecast-header">
            <div className="day">
              {new Date(weather.sunrise).toLocaleDateString('sl-SI', {
                weekday: 'short',
              })}
            </div>
          </div>
          <div className="forecast-content">
            <div className="forecast-icon inline-flex">
              <img src={weather.image} width={48} height={48} alt="Weather icon" />
            </div>
            <div className={`${'text-red-500'}`}>
              {weather.temperature_2m_max}°C
            </div>
            <div className={`${'text-blue-500'}`}>
              {weather.temperature_2m_min}°C
            </div>
            <small>{weather.description}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export {
    WeatherForecast
}
