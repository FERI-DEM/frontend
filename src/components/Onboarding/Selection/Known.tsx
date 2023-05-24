import Auth from '@/layouts/Auth';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import PowerPlantsService from '@/api/power-plants.service';
import { PowerPlantCreateReq, CalibrationReq } from '../../../types/power-plant.type';
import MapboxMap from '@/components/Maps/Map';
import { useCallback, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { geoCoder } from '@/components/Maps/extension/geoCoder';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardSkeleton from '@/components/Skeletons/DashboardSkeleton';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import usePowerPlants from '@/hooks/usePowerPlants';

interface OnboardingType {
    name: string;
    power: number;
}

export default function Known() {
    const { loading } = useAuthRequired();
    const { powerPlants, powerPlantsMutate, powerPlantsError, powerPlantsLoading } = usePowerPlants();

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
            maxPower: 0,
            size: 0,
        };
        const powerPlant = await PowerPlantsService.createPowerPlant(powerPlantData).catch((error) => {
            toast.error('Napaka pri ustvarjanju elektrarne');
            return;
        });

        await powerPlantsMutate();

        await PowerPlantsService.calibration(powerPlant._id, +data.power).catch((error) => {
            toast.error('Napaka pri kalibriranju elektrarne');
            return;
        });

        setTimeout(() => {
            toast.success('Wuhooo! Sedaj lahko začnete z uporabo aplikacije.');
            Router.push('/dashboard');
        }, 2000);
    };

    if (loading || (powerPlantsLoading && !powerPlantsError)) {
        return <DashboardSkeleton />;
    }

    return <></>;
}
