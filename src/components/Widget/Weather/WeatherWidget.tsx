import { WeatherForecast } from "./WeatherForecast"
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const WeatherWidget = () => {
    return (
      <>
        <div className="text-center relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg dark:bg-gray-800">
          <div className="flex-auto p-4 justify-center">
            <div className="flex flex-wrap">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 className="text-slate-400 uppercase font-bold text-xs">Vremenska napoved</h5>
              </div>
            </div>
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <SimpleBar forceVisible="y" autoHide={false}>
                {/* Apply SimpleBar wrapper and set maxHeight */}
                <WeatherForecast />
              </SimpleBar>
            </div>
            <p className="text-sm text-slate-400 mt-4">
              <span className="whitespace-nowrap text-xs">
                Vir: <a href="https://open-meteo.com/">Open-Meteo</a>
              </span>
            </p>
          </div>
        </div>
      </>
    );
  };
  
  export { WeatherWidget };