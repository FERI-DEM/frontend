import { PowerPlant } from "@/types/power-plant.type";
import PowerPlantsService from "@/api/power-plants.service";

interface PowerPlantCardProps {
    powerPlant: PowerPlant;
    updatePowerPlants: () => void;
    length: number;
}
const PowerPlantCard = ({ powerPlant, updatePowerPlants, length }: PowerPlantCardProps) => {
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
                <button className="m-2 p-2 inline-flex justify-center items-center text-sm font-medium text-center text-white bg-red-700 rounded-md hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handlePlantDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px"><path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg>
                </button>
            </div>
        </div>
    );
};

export default PowerPlantCard;