import React, { useState, useEffect } from 'react';

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

    const newPosition = (elapsedTime / duration) * 100;
    setSunPosition(newPosition > 100 ? 100 : newPosition);
  }, [sunrise, sunset]);

  return (
    <div className="sun-path flex justify-center items-center mt-10">
      <div className="donut-container">
        <svg className="half-donut" viewBox="0 0 100 100">
          <path
            className="path-background"
            d="M50 5 A45 45 0 1 1 50 95"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="10"
          />
          <path
            className="path-sun"
            d={`M50 5 A45 45 0 0 1 ${
              Math.cos((Math.PI / 180) * (sunPosition * 180 - 90)) * 45 + 50
            } ${Math.sin((Math.PI / 180) * (sunPosition * 180 - 90)) * 45 + 50}`}
            fill="none"
            stroke="orange"
            strokeWidth="10"
            style={{ strokeDasharray: 282.7, strokeDashoffset: 0 }}
          />
        </svg>
      </div>
    </div>
  );
};

export default SunPath;
