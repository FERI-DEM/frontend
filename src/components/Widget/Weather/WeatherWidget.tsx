import { WeatherForecast } from './WeatherForecast';
import { Panel } from './Panel';
import { useState } from 'react';
import SunPath from './SunPath';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { PowerPlant } from '@/types/power-plant.type';
import useForecastsWeather from '@/hooks/useForecastsWeather';
import CardSkeleton from '@/components/Skeletons/CardSkeleton';

interface Props {
    powerPlant: PowerPlant | undefined;
}

const WeatherWidget = ({ powerPlant }: Props) => {
    const { forecastsWeather: weather, forecastsWeatherLoading } = useForecastsWeather(
        powerPlant?.latitude,
        powerPlant?.longitude
    );

    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleSwitchToggle = () => {
        setIsSwitchOn((prevSwitch) => !prevSwitch);
    };

    return (
        <>
            {(weather && (
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg dark:bg-gray-800">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg dark:bg-gray-800">
                        <div className="flex-auto justify-center">
                            {isSwitchOn ? (
                                <Panel title="Potek sonca" onSwitchToggle={handleSwitchToggle}>
                                    <SunPath
                                        sunrise={weather.map((x) => x.sunrise)[0]}
                                        sunset={weather.map((x) => x.sunset)[0]}
                                    />
                                </Panel>
                            ) : (
                                <Panel title="Vremenska napoved" onSwitchToggle={handleSwitchToggle}>
                                    <SimpleBar style={{ height: '100%', width: '100%' }}>
                                        <WeatherForecast weather={weather} />
                                    </SimpleBar>
                                </Panel>
                            )}
                        </div>
                    </div>
                </div>
            )) || <CardSkeleton />}
        </>
    );
};

export { WeatherWidget };
