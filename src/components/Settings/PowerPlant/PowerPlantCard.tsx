import { PowerPlant } from '@/types/power-plant.type';
import PowerPlantsService from '@/api/power-plants.service';
import EditPowerPlantModal from './EditPowerPlantModal';
import CalibrationModal from '../../UI/CalibrationModal';
import { useCallback, useState } from 'react';
import MapboxMap from '@/components/Maps/Map';
import mapboxgl from 'mapbox-gl';
import ConfirmDeleteModal from '@/components/UI/ConfirmDeleteModal';

interface PowerPlantCardProps {
    powerPlant: PowerPlant;
    updatePowerPlants: () => void;
    length: number;
}

const PowerPlantCard = ({ powerPlant, updatePowerPlants, length }: PowerPlantCardProps) => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showCalibrationModal, setShowCalibrationModal] = useState<boolean>(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<boolean | undefined>(false);

    const onMapCreated = useCallback(
        (map: mapboxgl.Map) => {
            const marker = new mapboxgl.Marker({
                color: 'RED',
                draggable: false,
            });

            marker.setLngLat([powerPlant.longitude, powerPlant.latitude]).addTo(map);
        },
        [powerPlant.latitude, powerPlant.longitude]
    );

    const handlePlantDelete = async () => {
        await PowerPlantsService.deletePowerPlant(powerPlant._id).finally(() => {
            updatePowerPlants();
            setShowConfirmDeleteModal(false);
        });
    };

    const getLastCalibration = () => {
        return (
            (powerPlant?.calibration &&
                powerPlant?.calibration?.length > 0 &&
                powerPlant?.calibration?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]) ||
            null
        );
    };

    return (
        <>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="h-48 max-w-full rounded-t-lg">
                    <MapboxMap
                        initialOptions={{ center: [powerPlant.longitude, powerPlant.latitude], zoom: 10.0 }}
                        className="rounded-t-lg"
                        disabled={true}
                        onCreated={onMapCreated}
                    />
                </div>
                <div className="p-5">
                    <a href="#">
                        <h5 className="inline-flex items-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            <span className="material-symbols-rounded -ml-0.5 mr-1.5">solar_power</span>
                            {powerPlant.displayName}
                        </h5>
                    </a>
                    <p className="mb-3 font-normal te*92604515200t-gray-700 dark:text-gray-400">
                        <span className="material-symbols-rounded material-font-size-sm mr-1.5">location_on</span>
                        Lokacija: {powerPlant.longitude} {powerPlant.latitude}
                        <br />
                        {(powerPlant.calibration && powerPlant.calibration.length > 0 && (
                            <>
                                <span className="material-symbols-rounded material-filled material-font-size-xs mr-1.5">
                                    my_location
                                </span>
                                <span>
                                    Zadnja kalibracija:{' '}
                                    {new Date(getLastCalibration()?.date ?? 0).toLocaleString('sl-SI')}
                                </span>
                                <br />
                                <span>
                                    <span className="material-symbols-rounded material-font-size-sm mr-1">bolt</span>
                                    Moč: {powerPlant.maxPower} kW
                                </span>
                            </>
                        )) || (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                                Manjkajoča kalibracija
                            </span>
                        )}
                    </p>

                    <div className="flex flex-wrap justify-center mt-5">
                        <button
                            className="inline-flex items-center px-3 py-1 mr-1 text-xs font-medium text-center text-white bg-emerald-700 rounded-full hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                            onClick={() => setShowCalibrationModal(true)}
                        >
                            <span className="material-symbols-rounded material-filled material-font-size-xs -ml-0.5 mr-1.5">
                                my_location
                            </span>
                            Kalibriraj
                        </button>
                        <button
                            className="inline-flex items-center px-3 py-1 mr-1 text-xs font-medium text-center text-white bg-sky-700 rounded-full hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                            onClick={() => setShowEditModal(true)}
                        >
                            <span className="material-symbols-rounded material-filled material-font-size-xs -ml-0.5 mr-1.5">
                                edit
                            </span>
                            Uredi
                        </button>
                        <button
                            className="inline-flex disabled:bg-slate-400 items-center px-2 py-1 text-xs font-medium text-center text-white bg-red-700 rounded-full hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            onClick={() => setShowConfirmDeleteModal(true)}
                        >
                            <span className="material-symbols-rounded material-font-size-xs">delete_forever</span>
                        </button>
                    </div>
                </div>
            </div>
            {showEditModal && (
                <EditPowerPlantModal
                    powerPlant={powerPlant}
                    updatePowerPlants={updatePowerPlants}
                    closeModal={() => setShowEditModal(false)}
                />
            )}
            {showCalibrationModal && (
                <CalibrationModal
                    closeModal={() => setShowCalibrationModal(false)}
                    updatePowerPlants={updatePowerPlants}
                    powerPlantId={powerPlant._id}
                />
            )}
            {showConfirmDeleteModal && (
                <ConfirmDeleteModal
                    openModal={showConfirmDeleteModal}
                    closeModal={setShowConfirmDeleteModal}
                    deleteItem={handlePlantDelete}
                />
            )}
        </>
    );
};

export default PowerPlantCard;
