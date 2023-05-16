import { useForm } from 'react-hook-form';
import MapboxMap from '@/components/Maps/Map';
import { useCallback, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { geoCoder } from '@/components/Maps/extension/geoCoder';
import PowerPlantsService from '@/api/power-plants.service';
import { PowerPlant } from '@/types/power-plant.type';

interface EditPowerPlantModalProps {
    powerPlant: PowerPlant;
    closeModal: () => void;
    updatePowerPlants: () => void;
}

interface EditedPowerPlant {
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
}

const EditPowerPlantModal = ({ powerPlant, closeModal, updatePowerPlants }: EditPowerPlantModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditedPowerPlant>({ mode: 'onBlur' });
    const [viewport, setViewport] = useState({
        center: [15.646, 46.554],
        zoom: '10.00',
    });

    useEffect(() => {
        setViewport({
            center: [+powerPlant.longitude, +powerPlant.latitude],
            zoom: '10.00',
        });
    }, [powerPlant]);

    const onSubmit = async (data: EditedPowerPlant) => {
        await PowerPlantsService.updatePowerPlant(powerPlant._id, {
            displayName: data.name,
            longitude: +viewport.center[0],
            latitude: +viewport.center[1],
        })
            .then(() => {
                closeModal();
                updatePowerPlants();
            })
            .catch((error) => {
                alert(error);
            });
    };

    const onMapCreated = useCallback((map: mapboxgl.Map) => {
        const marker = new mapboxgl.Marker({
            color: 'RED',
            draggable: true,
        });

        marker.setLngLat([powerPlant.longitude, powerPlant.latitude]).addTo(map);

        const geocoder = geoCoder();

        map.addControl(geocoder, 'top-left');

        geocoder.on('result', (e) => {
            const center = e.result.center;
            if (center === undefined) return;
            center[0] = center[0].toFixed(4).toString();
            center[1] = center[1].toFixed(4).toString();
            setViewport({ center: center, zoom: '10.00' });
        });

        const saveCoordinates = () => {
            const lngLat = marker.getLngLat();
            setViewport({
                center: [+lngLat.lng.toFixed(4).toString(), +lngLat.lat.toFixed(4).toString()],
                zoom: '10.00',
            });
        };

        marker.on('dragend', saveCoordinates);

        const addMarker = (event: any) => {
            let coordinates = event.lngLat;
            marker.setLngLat(coordinates).addTo(map);
            saveCoordinates();
        };

        map.on('click', addMarker.bind(map));
    }, [powerPlant.latitude, powerPlant.longitude]);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full bg-opacity-40 bg-black">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Uredi elektrarno</h3>
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
                        <form className="space-y-6" action="" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Ime elektrarne
                                </label>
                                <input
                                    type="text"
                                    {...register('name', { required: 'Ime elektrarne je obvezno polje', value: powerPlant.displayName })}
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                />
                                {errors.name && <p className="text-red-400">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Lokacija
                                </label>
                                <div className="h-72 w-full">
                                    <MapboxMap
                                        initialOptions={{ center: [powerPlant.longitude, powerPlant.latitude], zoom: 10.0 }}
                                        className="rounded-t-lg"
                                        onCreated={onMapCreated}
                                    />
                                </div>
                            </div>
                            <div className='flex items-center p-4 pb-0 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Shrani
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPowerPlantModal;