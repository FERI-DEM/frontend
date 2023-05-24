import { PowerPlantType } from '@/types/power-plant.type';
import React, { useState } from 'react';

export default function Custom() {
    const [selectedOption, setSelectedOption] = useState<PowerPlantType>(0);
    const [availablePowerPlantTypes, setAvailablePowerPlantTypes] = useState([
        {
            key: 'power-plant-small',
            value: PowerPlantType.Small,
            text: 'Mala - do 20 kW',
            numberOfIcons: 1,
        },
        {
            key: 'power-plant-medium',
            value: PowerPlantType.Medium,
            text: 'Srednja - od 20 do 80 kW',
            numberOfIcons: 2,
        },
        {
            key: 'power-plant-big',
            value: PowerPlantType.Big,
            text: 'Velika - od 80 do 300 kW',
            numberOfIcons: 3,
        },
        {
            key: 'power-plant-custom',
            value: PowerPlantType.Custom,
            text: 'Po meri - več kot 300 kW',
            numberOfIcons: 4,
        },
    ]);

    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                Prosimo, izberite velikost vaše elektrarne.
            </h3>
            <div className="grid w-full gap-2 md:grid-cols-1">
                {availablePowerPlantTypes.map((powerPlantType) => {
                    return (
                        <div>
                            <input
                                type="radio"
                                id={powerPlantType.key}
                                name="powerPlantType"
                                value={powerPlantType.value}
                                className="hidden peer"
                                required
                                onChange={handleOptionChange}
                            />
                            <label
                                htmlFor={powerPlantType.key}
                                className={`inline-flex items-center justify-between w-full px-3 py-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 ${
                                    selectedOption == powerPlantType.value
                                        ? 'text-green-500 border-green-600'
                                        : 'dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'
                                }`}
                            >
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">{powerPlantType.text}</div>
                                </div>
                                <div>
                                    {Array.from({ length: powerPlantType.numberOfIcons }, (v, i) => {
                                        return (
                                            <span className="material-symbols-rounded material-filled material-font-size-4xl">
                                                solar_power
                                            </span>
                                        );
                                    })}
                                </div>
                            </label>
                        </div>
                    );
                })}
            </div>

            <div>
                <input
                    id="minmax-range"
                    type="range"
                    min="0"
                    max="10"
                    value="5"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
            </div>
        </>
    );
}
