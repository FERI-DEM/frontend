import DefaultLayout from '@/layouts/DefaultLayout';
import PowerPlantSettings from "@/components/Settings/PowerPlant/PowerPlantSettings";
import Head from 'next/head';
import { useRequiredAuth } from '@/context/RequiredAuth';
import { PowerPlant } from '@/types/power-plant.type';
import { useEffect, useState } from 'react';
import PowerPlantsService from '@/api/power-plants.service';

export default function Settings() {
  const auth = useRequiredAuth();
  const { user } = auth;
  const [powerPlants, setPowerPlants] = useState<PowerPlant[]>([]);

  useEffect(() => {
    const getPowerPlants = async () => {
      const powerPlants = await PowerPlantsService.getPowerPlants();
      setPowerPlants(powerPlants);
    };
    getPowerPlants();
  }, []);
  return (
    <DefaultLayout>
      <Head>
        <title>Nastavitve - Watt4Cast</title>
      </Head>
      <div className="grid px-4 pt-6 xl:auto-rows-min xl:gap-4 dark:bg-gray-900 h-screen min-h-min">
          <PowerPlantSettings PowerPlants={powerPlants}  />
      </div>
    </DefaultLayout>
  );
}
