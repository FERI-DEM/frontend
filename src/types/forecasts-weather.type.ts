export interface WeatherWidget {
    weathercode: number;
    temperature_2m_max: number;
    temperature_2m_min: number;
    sunrise: string;
    sunset: string;
}

interface HourlyDataInterval {
    time: string[];
    weatherCode: number[];
    description: string[];
    image: string[];
}

export interface WeatherWidgetFull extends WeatherWidget {
    description: string;
    image: string;
    hourlyDataInterval: HourlyDataInterval;
}
