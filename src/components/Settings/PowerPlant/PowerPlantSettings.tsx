import CardBasic from '@/components/Cards/CardBasic';
import PowerPlantCard from './PowerPlantCard';
import { useState } from 'react';
import AddPowerPlantModal from './AddPowerPlantModal';
import usePowerPlants from '@/hooks/usePowerPlants';

const PowerPlantSettings = () => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const { powerPlants, powerPlantsMutate, powerPlantsLoading } = usePowerPlants();

    return (
        <>
            {powerPlants &&
                powerPlants.length > 0 &&
                powerPlants.map((powerPlant) => (
                    <PowerPlantCard
                        key={powerPlant._id}
                        powerPlant={powerPlant}
                        updatePowerPlants={() => powerPlantsMutate()}
                        length={powerPlants.length}
                    />
                ))}
            {showAddModal && (
                <AddPowerPlantModal
                    closeModal={() => setShowAddModal(false)}
                    updatePowerPlants={() => powerPlantsMutate()}
                />
            )}

            <button
                className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setShowAddModal(true)}
            >
                Dodaj elektrarno
            </button>
        </>
    );
};

export default PowerPlantSettings;
