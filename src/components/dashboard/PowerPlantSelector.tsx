import { PowerPlant } from '@/types/power-plant.type';
import { Dropdown } from 'flowbite-react';
import { useEffect, useState } from 'react';

interface Props {
    powerPlants: PowerPlant[] | undefined;
    selectedPowerPlantOutput: (output: PowerPlant) => void;
}

export default function PowerPlantSelector({ powerPlants, selectedPowerPlantOutput }: Props) {
    const [selectedPowerPlant, setSelectedPowerPlant] = useState<PowerPlant | null>();

    useEffect(() => {
        if (powerPlants && powerPlants.length > 0) {
            setSelectedPowerPlant(powerPlants[0]);
            selectedPowerPlantOutput(powerPlants[0]);
        }
    }, [powerPlants]);

    return (
        <>
            {powerPlants && powerPlants.length > 0 && (
                <Dropdown
                    label={
                        <span className="inline-flex items-center text-lg font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <mark className="inline-flex items-center px-2 py-1.5 text-white bg-amber-700 rounded dark:bg-amber-800">
                                {selectedPowerPlant?.displayName}
                                <span className="material-symbols-rounded w-6 h-6 ml-1">expand_more</span>
                            </mark>
                        </span>
                    }
                    arrowIcon={false}
                    inline={true}
                >
                    {powerPlants?.map((powerPlant, index) => {
                        return (
                            <Dropdown.Item
                                key={`PowerPlantSelector${powerPlant._id}${index}`}
                                onClick={() => {
                                    setSelectedPowerPlant(powerPlant);
                                    selectedPowerPlantOutput(powerPlant);
                                }}
                            >
                                {powerPlant.displayName}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown>
            )}
        </>
    );
}
