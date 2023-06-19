import Auth from '@/layouts/Auth';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import PowerPlantsService from '@/api/power-plants.service';
import { PowerPlantCalibrationReq, PowerPlantCreateReq, PowerPlantType } from '../../types/power-plant.type';
import MapboxMap from '@/components/Maps/Map';
import { useCallback, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { geoCoder } from '@/components/Maps/extension/geoCoder';
import { toast } from 'react-toastify';
import DashboardSkeleton from '@/components/Skeletons/DashboardSkeleton';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import usePowerPlants from '@/hooks/usePowerPlants';

interface OnboardingType {
    name: string;
    maxPower: number;
    size: number;
}

export default function Calibration() {
    const { loading } = useAuthRequired();
    const { powerPlants, powerPlantsMutate, powerPlantsError, powerPlantsLoading } = usePowerPlants();
    const [maxPowerValue, setMaxPowerValue] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<PowerPlantType>();
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

    useEffect(() => {
        if (!powerPlantsLoading && powerPlants && powerPlants.length > 0) {
            Router.push('/dashboard');
        }
    }, [powerPlants]);

    const methods = useForm<OnboardingType>({ mode: 'onBlur' });

    const [viewport, setViewport] = useState<{
        center: { lng: number; lat: number };
        zoom: number;
    }>({ center: { lng: 15.646, lat: 46.554 }, zoom: 10.0 });

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = methods;

    const {
        center: { lng, lat },
        zoom,
    } = viewport;

    const onMapCreated = useCallback((map: mapboxgl.Map) => {
        const marker = new mapboxgl.Marker({
            color: 'RED',
            draggable: true,
        });

        const geocoder = geoCoder();

        map.addControl(geocoder, 'top-left');

        geocoder.on('result', (e) => {
            const center = e.result.center;
            if (center === undefined) return;
            setViewport({
                center: { lng: +center[0].toFixed(4).toString(), lat: +center[1].toFixed(4).toString() },
                zoom: 10.0,
            });
        });

        const saveCoordinates = () => {
            const lngLat = marker.getLngLat();
            setViewport({
                center: { lng: +lngLat.lng.toFixed(4).toString(), lat: +lngLat.lat.toFixed(4).toString() },
                zoom: 10.0,
            });
        };

        marker.on('dragend', saveCoordinates);

        const addMarker = (event: any) => {
            let coordinates = event.lngLat;
            marker.setLngLat(coordinates).addTo(map);
            saveCoordinates();
        };

        map.on('click', addMarker.bind(map));
    }, []);

    const onSubmit = async (data: OnboardingType) => {
        if (viewport.center === undefined) return;
        const powerPlantData: PowerPlantCreateReq = {
            displayName: data.name,
            latitude: +viewport.center.lat,
            longitude: +viewport.center.lng,
        };
        const powerPlant = await PowerPlantsService.createPowerPlant(powerPlantData)
        .catch((error) => {
            toast.error('Napaka pri ustvarjanju elektrarne');
            return;
        });

        if (!powerPlant) return;

        const calibration = await PowerPlantsService.calibration(powerPlant._id, maxPowerValue)
        .catch((error) => {
            toast.error('Napaka pri kalibraciji elektrarne');
            return;
        });

        await powerPlantsMutate();

        setTimeout(() => {
            toast.success('Wuhooo! Sedaj lahko začnete z uporabo aplikacije.');
            Router.push('/dashboard');
        }, 2000);
    };

    const handlePowerPlantTypeChange = (event: any) => {
        setSelectedOption(event.target.value);
        const selected = availablePowerPlantTypes?.find((x) => x.value == event.target.value);
        setMaxPowerValue(selected?.maxPower ?? 0);
    };

    const handleMaxPowerChange = (event: any) => {
        setMaxPowerValue(event.target.value);
    };

    if (loading || (powerPlantsLoading && !powerPlantsError)) {
        return <DashboardSkeleton />;
    }

    return (
        <Auth>
            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dobrodošli! Še zadnji korak...</h2>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Ime elektrarne
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: 'Ime elektrarne je obvezno polje' })}
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Ime elektrarne"
                            required
                        />
                        {errors.name && <p className="mt-2 text-red-400">{errors.name.message}</p>}
                    </div>

                    <div>
                        <h4 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                            Prosimo, izberite velikost vaše elektrarne.
                        </h4>
                        <div className="grid w-full gap-2 md:grid-cols-1">
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
                                            className={`inline-flex items-center justify-between w-full px-3 py-1 bg-white border rounded-lg cursor-pointer hover:text-amber-600 dark:hover:text-amber-600 dark:hover:border-amber-900 ${
                                                selectedOption == powerPlantType.value
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
                        </div>

                        <div className="mt-5">
                            <small className="block mb-2 font-medium text-gray-900 dark:text-white">Izbrana moč elektrarne: {maxPowerValue} kW</small>
                            <input
                                id="maxPower"
                                {...register('maxPower', { required: 'Velikost elektrarne je obvezno polje' })}
                                name="maxPower"
                                type="range"
                                min="0"
                                max="900"
                                value={maxPowerValue}
                                onChange={handleMaxPowerChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                required
                            />
                        </div>
                        {errors.maxPower && <p className="mt-2 text-red-400">{errors.maxPower.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokacija</label>

                        <div className="h-72 w-full">
                            <MapboxMap
                                initialOptions={{ center: [+lng, +lat], zoom: +zoom }}
                                onCreated={onMapCreated}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Potrdi
                    </button>
                </form>
            </div>
        </Auth>
    );
}
