import Auth from '@/layouts/Auth';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import PowerPlantsService from '@/api/power-plants.service';
import { PowerPlantCreateReq } from '../../types/power-plant.type';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DashboardSkeleton from '@/components/Skeletons/DashboardSkeleton';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import usePowerPlants from '@/hooks/usePowerPlants';
import { PlantNameInput } from '@/components/Onboarding/Form/PlantNameInput';
import { PlantPowerInput } from '@/components/Onboarding/Form/PlantPowerInput';
import { PlantLocationInput } from '@/components/Onboarding/Form/PlantLocationInput';
import { PlantCalibrateBtn } from '@/components/Onboarding/Form/PlantCalibrateBtn';
import { PlantSelectorInput } from '@/components/Onboarding/Form/PlantSelectorInput';

export interface OnboardingType {
    name: string;
    power: number;
    size: number;
}

export default function Calibration() {
    const { loading } = useAuthRequired();
    const { powerPlants, powerPlantsMutate, powerPlantsError, powerPlantsLoading } = usePowerPlants();
    const [maxPowerValue, setMaxPowerValue] = useState<number>(0);

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

    const handleViewportChange = (newViewport: {
        center: { lng: number; lat: number };
        zoom: number;
      }) => {
        setViewport(newViewport);
      };

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = methods;

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

    const handleMaxPowerChange = (power: number) => {
        setMaxPowerValue(power);
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
                        <PlantNameInput register={register} errors={errors} />
                    </div>

                    <div>
                        <h4 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                            Prosimo, izberite velikost vaše elektrarne.
                        </h4>
                        <div className="grid w-full gap-2 md:grid-cols-1">
                            <PlantSelectorInput register={register} errors={errors} onMaxPowerChange={handleMaxPowerChange} />
                        </div>

                        <div className="mt-5">
                            <PlantPowerInput register={register} errors={errors} power={maxPowerValue} setPower={handleMaxPowerChange} />
                        </div>
                    </div>

                    <div>
                        <PlantLocationInput register={register} errors={errors} onViewportChange={handleViewportChange} />
                    </div>
                    <PlantCalibrateBtn />
                </form>
            </div>
        </Auth>
    );
}
