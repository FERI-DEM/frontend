import { useState } from "react";
import PowerPlantsService from "@/api/power-plants.service";

interface CalibrationModalProps {
    closeModal: () => void;
    updatePowerPlants: () => void;
    powerPlantId: string;
}

const CalibrationModal = ({ closeModal, updatePowerPlants, powerPlantId}:CalibrationModalProps) => {
    const [error, setError] = useState<string>("");
    const [calibration, setCalibration] = useState<number>(0);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if(error != "" || calibration <= 0) {
            return;
        }
        console.log(powerPlantId, calibration);

        await PowerPlantsService.calibration(powerPlantId, calibration).then(() => {
            updatePowerPlants();
            closeModal();
        });
    };
    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full bg-opacity-40 bg-black">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Kalibracija</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeModal}
                        >
                            <span className="material-symbols-rounded">close</span>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label
                                htmlFor="calibration"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Prosim vpišite trenutno proizvodnjo v kW
                            </label>
                            <input
                                type="text"
                                name="calibration"
                                id="calibration"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required
                                onChange={(e) => {
                                    if (parseInt(e.target.value) <= 0) {
                                        setError("Vrednost mora biti večja od 0");
                                    }
                                    else if (isNaN(parseInt(e.target.value))) {
                                        setError("Vrednost mora biti številka");
                                    }
                                    else {
                                        setError("");
                                        setCalibration(parseInt(e.target.value));
                                    };
                                }}
                            />
                            {error && <p className="text-red-400">{error}</p>}
                        </div>
                        <div className='flex items-center p-4 pb-0 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleSubmit}
                            >
                                Kalibriraj
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalibrationModal;