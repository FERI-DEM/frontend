import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { SunChart } from './SunChart';
import Image from 'next/image';

type SunPathProps = {
    sunrise: string;
    sunset: string;
};

const SunPath = ({ sunrise, sunset }: SunPathProps) => {
    const [sunPosition, setSunPosition] = useState<number>(0);
    const [colorTheme, setColorTheme] = useState<string>('');

    useEffect(() => {
        const sunriseTime = moment.utc(sunrise).local().toDate().getTime();
        const sunsetTime = moment.utc(sunset).local().toDate().getTime();
        const currentTime = new Date().getTime();
        const duration = sunsetTime - sunriseTime;
        const elapsedTime = currentTime - sunriseTime;

        const percentage = (elapsedTime / duration) * 100;
        const newPosition = Math.min(percentage, 100);

        setSunPosition(newPosition);
    }, [sunrise, sunset]);

    return (
        <div className="text-center flex justify-center items-center flex-col text-black">
            <div>
                {sunrise && (
                    <SunChart series={[sunPosition]} />
                )}
            </div>
            <div className="flex gap-24">
                <div className="flex-col items-center mt-2">
                    <div role="img" aria-label="sunrise" style={{ fontSize: '2rem' }}>
                        <Image src={`/images/sunpath/sunrise.svg`} width={50} height={50} alt="sunrise" className="text-white dark:text-gray" />
                    </div>
                    <div className='dark:text-white'>{moment.utc(sunrise).local().format('HH:mm')}</div>
                </div>
                <div className="sunset-time flex-col items-center mt-2">
                    <div role="img" aria-label="sunset" style={{ fontSize: '2rem' }}>
                        <Image src={`/images/sunpath/sunset.svg`} width={50} height={50} alt="sunset" />
                    </div>
                    <div className='dark:text-white'>{moment.utc(sunset).local().format('HH:mm')}</div>
                </div>

            </div>
        </div>
    );
};

export default SunPath;
