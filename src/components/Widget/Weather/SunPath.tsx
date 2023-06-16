import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { SunChart } from './SunChart';

type SunPathProps = {
    sunrise: string;
    sunset: string;
};

const SunPath = ({ sunrise, sunset }: SunPathProps) => {
    const [sunPosition, setSunPosition] = useState<number>(0);

    useEffect(() => {
        const sunriseTime = new Date(sunrise).getTime();
        const sunsetTime = new Date(sunset).getTime();
        const currentTime = new Date().getTime();
        const duration = sunsetTime - sunriseTime;
        const elapsedTime = currentTime - sunriseTime;

        const percentage = (elapsedTime / duration) * 100;
        const newPosition = Math.min(percentage, 100);

        setSunPosition(newPosition);
    }, [sunrise, sunset]);

    return (
        <div className="text-center flex justify-center items-center flex-col">
            <div>
                {sunrise && (
                    <SunChart series={[sunPosition]} />
                )}
            </div>
            <div className="flex gap-24">
                <div className="flex-col items-center mt-2">
                    <div role="img" aria-label="sunrise" style={{ fontSize: '2rem' }}>
                        ⛅️
                    </div>
                    <div>{moment.utc(sunrise).local().format('HH:mm')}</div>
                </div>
                <div className="sunset-time flex-col items-center mt-2">
                    <div role="img" aria-label="sunset" style={{ fontSize: '2rem' }}>
                        🌅
                    </div>
                    <div>{moment.utc(sunset).local().format('HH:mm')}</div>
                </div>

            </div>
        </div>
    );
};

export default SunPath;
