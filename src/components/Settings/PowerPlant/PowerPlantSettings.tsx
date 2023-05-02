import CardBasic from "@/components/Cards/CardBasic";
import { PowerPlant } from "@/types/power-plant.type";
import PowerPlantCard from "./PowerPlantCard";
import { useState, useEffect } from "react";
import AddPowerPlantModal from "./AddPowerPlantModal";
import PowerPlantsService from "@/api/power-plants.service";

const PowerPlantSettings = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [powerPlants, setPowerPlants] = useState<PowerPlant[]>([]);

    const getPowerPlants = async () => {
        const powerPlants = await PowerPlantsService.getPowerPlants();
        setPowerPlants(powerPlants);
    };
    useEffect(() => {
      getPowerPlants();
    }, []);
    return (
        <div className='flex flex-row flex-wrap'>
            {powerPlants.length !== 0 ? (
                <CardBasic title='Elektrarne' buttonTitle='Dodaj elektrarno'>
                    {powerPlants.map((powerPlant) => (
                        <PowerPlantCard key={powerPlant._id} powerPlant={powerPlant} updatePowerPlants={() => getPowerPlants()} length={powerPlants.length} />
                    ))}
                    <button
                        className="mt-3 inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => setShowModal(true)}
                    >
                        Dodaj elektrarno
                    </button>
                </CardBasic>
            ) : (
                ""
            )}
            {showModal && (
                <AddPowerPlantModal closeModal={() => setShowModal(false)} updatePowerPlants={() => getPowerPlants()} />
            )}
        </div>
    );
};

export default PowerPlantSettings;