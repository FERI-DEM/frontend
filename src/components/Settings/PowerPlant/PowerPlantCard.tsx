import { PowerPlant } from "@/types/power-plant.type";
import PowerPlantsService from "@/api/power-plants.service";

interface PowerPlantCardProps {
    powerPlant: PowerPlant;
    updatePowerPlants: (powerPlants:PowerPlant[]) => void;
    length: number;
}
const PowerPlantCard = ({ powerPlant, updatePowerPlants, length }: PowerPlantCardProps) => {
    const handlePlantDelete = async () => {
        console.log(length);
        if (length == 1) {
            alert('You cannot delete your last power plant');
            return;
        }
    };
    return (
        <div className="p-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-max">
            <div className="content flex align-middle">
                <div className="m-3">{powerPlant.displayName}</div>
                <button className="m-2 inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handlePlantDelete}>Delete</button>
            </div>
        </div>
    );
};

export default PowerPlantCard;