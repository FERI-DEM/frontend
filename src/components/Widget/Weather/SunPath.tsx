import React, { useState, useEffect } from 'react';

type SunPathProps = {
  sunrise: string;
  sunset: string;
};

const SunPath = ({ sunrise, sunset }: SunPathProps) => {
  const [sunPosition, setSunPosition] = useState<number>(-90); // Initialize with -90 to start at sunrise

  useEffect(() => {
    const sunriseTime = new Date(sunrise).getTime();
    const sunsetTime = new Date(sunset).getTime();
    const currentTime = new Date().getTime();
    const duration = sunsetTime - sunriseTime;
    const elapsedTime = currentTime - sunriseTime;

    const newPosition = (elapsedTime / duration) * 180 - 90; // Subtract 90 to start at -90 for sunrise
    setSunPosition(newPosition);

    if (elapsedTime >= duration) {
      setSunPosition(90); // Set to 90 for sunset
    }
  }, [sunrise, sunset]);

  return (
    <div className="sun-path">
      <div className="sunrise-sunset">
        <div className="sunrise">
          <span>Sunrise: {sunrise}</span>
        </div>
        <div className="sunset">
          <span>Sunset: {sunset}</span>
        </div>
      </div>
      <div className="half-donut-container">
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
            d={`M50 5 A45 45 0 ${sunPosition > 0 ? '1' : '0'} 1 ${
              Math.cos((Math.PI / 180) * sunPosition) * 45 + 50
            } ${Math.sin((Math.PI / 180) * sunPosition) * 45 + 50}`}
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
