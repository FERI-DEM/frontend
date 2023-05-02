import { PowerPlant } from "@/types/power-plant.type";
import PowerPlantsService from "@/api/power-plants.service";
import EditPowerPlantModal from "./EditPowerPlantModal";
import { useState } from "react";

interface PowerPlantCardProps {
    powerPlant: PowerPlant;
    updatePowerPlants: () => void;
    length: number;
}
const PowerPlantCard = ({ powerPlant, updatePowerPlants, length }: PowerPlantCardProps) => {
    const [ showEditModal, setShowEditModal ] = useState<boolean>(false);

    const handlePlantDelete = async () => {
        if (length == 1) {
            window.alert("You can't delete the last power plant!");
            return;
        }
        await PowerPlantsService.deletePowerPlant(powerPlant._id).then(() => {
            updatePowerPlants();
        });
    };
    return (
        <div className="p-2 mb-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-max">
            <div className="content flex align-middle">
                <div className="m-3">{powerPlant.displayName}</div>
                <button className="m-2 p-2 inline-flex justify-center items-center text-sm font-medium text-center text-white bg-red-700 rounded-md hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => setShowEditModal(true)}>
                    Uredi
                </button>
                <button className="m-2 p-2 inline-flex justify-center items-center text-sm font-medium text-center text-white bg-red-700 rounded-md hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handlePlantDelete}>
                    Odstrani
                </button>
            </div>
            {showEditModal && <EditPowerPlantModal powerPlant={powerPlant} updatePowerPlants={updatePowerPlants} closeModal={() => setShowEditModal(false)} />}
        </div>
    );
};

export default PowerPlantCard;