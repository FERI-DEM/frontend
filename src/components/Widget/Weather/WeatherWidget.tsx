import { WeatherForecast } from "./WeatherForecast";
import { Panel } from "./Panel";
import { useEffect, useState } from "react";
import { SunPath } from "./SunPath";
import PowerPlantsService from "@/api/power-plants.service";
import ForecastsService from "@/api/forecasts.service";

export interface WeatherWidget {
  weathercode: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  sunrise: string;
  sunset: string;
}
export interface WeatherWidgetFull extends WeatherWidget {
  description: string;
  image: string;
}

const WeatherWidget = () => {

    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleSwitchToggle = () => {
      setIsSwitchOn(prevSwitch => !prevSwitch);
    };

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
      <>
        <div className="text-center relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg dark:bg-gray-800">
          <div className="text-center relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg dark:bg-gray-800">
            <div className="flex-auto justify-center">
              {!isSwitchOn ? (
                <Panel title="Potek sonca" onSwitchToggle={handleSwitchToggle}>
                  <SunPath />
                </Panel>
              ) : (
                <Panel title="Vremenska napoved" onSwitchToggle={handleSwitchToggle}>
                <WeatherForecast weather={weather} />
              </Panel>
              )}              
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export { WeatherWidget };