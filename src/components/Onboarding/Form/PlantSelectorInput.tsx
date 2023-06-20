import { OnboardingType } from "@/pages/onboarding";
import { PowerPlantType } from "@/types/power-plant.type";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type PlantSelectorInputProps = {
    register: UseFormRegister<OnboardingType>;
    errors: FieldErrors<OnboardingType>;
    onMaxPowerChange: (power: number) => void;
}

export const PlantSelectorInput = ({ register, errors, onMaxPowerChange }: PlantSelectorInputProps) => {
    const [selectedOption, setSelectedOption] = useState<PowerPlantType>();
    const [maxPowerValue, setMaxPowerValue] = useState<number>(0);
    const [availablePowerPlantTypes, setAvailablePowerPlantTypes] = useState([
        {
            key: 'power-plant-small',
            value: PowerPlantType.Small,
            text: 'Mala - do 20 kW',
            numberOfIcons: 1,
            maxPower: 10,
        },
        {
            key: 'power-plant-medium',
            value: PowerPlantType.Medium,
            text: 'Srednja - od 20 do 80 kW',
            numberOfIcons: 2,
            maxPower: 40,
        },
        {
            key: 'power-plant-big',
            value: PowerPlantType.Big,
            text: 'Velika - od 80 do 300 kW',
            numberOfIcons: 3,
            maxPower: 100,
        },
        {
            key: 'power-plant-custom',
            value: PowerPlantType.Custom,
            text: 'Po meri - več kot 300 kW',
            numberOfIcons: 4,
            maxPower: 300,
        },
    ]);

    const handlePowerPlantTypeChange = (event: any) => {
        setSelectedOption(event.target.value);
        const selected = availablePowerPlantTypes?.find((x) => x.value == event.target.value);
        setMaxPowerValue(selected?.maxPower ?? 0);
    };

    useEffect(() => {
        onMaxPowerChange(maxPowerValue); // Emit maxPowerValue to parent component
    }, [maxPowerValue, onMaxPowerChange]);

    return (
        <>
            {availablePowerPlantTypes.map((powerPlantType, i) => {
                return (
                    <div key={`powerPlantType-${i}`}>
                        <input
                            type="radio"
                            id={powerPlantType.key}
                            name="powerPlantType"
                            value={powerPlantType.value}
                            className="hidden peer"
                            required
                            onChange={handlePowerPlantTypeChange}
                        />
                        <label
                            htmlFor={powerPlantType.key}
                            className={`inline-flex items-center justify-between w-full px-3 py-1 bg-white border rounded-lg cursor-pointer hover:text-amber-600 dark:hover:text-amber-600 dark:hover:border-amber-900 ${selectedOption == powerPlantType.value
                                    ? 'text-amber-800 dark:text-amber-800 border-2 border-amber-800 dark:border-amber-800'
                                    : 'text-gray-400 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900 border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            <div className="block">
                                <div className="w-full text-lg font-semibold">
                                    {powerPlantType.text}
                                </div>
                            </div>
                            <div>
                                {Array.from({ length: powerPlantType.numberOfIcons }, (v, i) => {
                                    return (
                                        <span key={`powerPlantType-numberOfIcons-${v}-${i}`} className="material-symbols-rounded material-filled material-font-size-4xl">
                                            solar_power
                                        </span>
                                    );
                                })}
                            </div>
                        </label>
                    </div>
                );
            })}
        </>
    );
}