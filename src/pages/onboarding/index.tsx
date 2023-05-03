import Auth from '@/layouts/Auth';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import PowerPlantsService from '@/api/power-plants.service';
import { PowerPlantCreateReq, CalibrationReq } from '../../types/power-plant.type';
import MapboxMap from '@/components/Maps/Map';
import { useCallback, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { geoCoder } from '@/components/Maps/extension/geoCoder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardSkeleton from '@/components/Skeletons/DashboardSkeleton';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import usePowerPlants from '@/hooks/usePowerPlants';

interface OnboardingType {
  name: string;
  power: number;
}

export default function Calibration() {
  const { loading } = useAuthRequired();
  const { powerPlants, powerPlantsError, powerPlantsLoading } = usePowerPlants();

  useEffect(() => {
    if (!powerPlantsLoading && powerPlants && powerPlants.length > 0) {
      Router.push('/dashboard');
    }
  }, [powerPlants, powerPlantsLoading]);

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
    };
    const powerPlant = await PowerPlantsService.createPowerPlant(powerPlantData).catch((error) => {
      toast.error('Napaka pri ustvarjanju elektrarne');
      return;
    });

    const calibrationData: CalibrationReq = {
      id: powerPlant.powerPlants[0]._id,
      power: +data.power,
    };

    await PowerPlantsService.calibration(calibrationData).catch((error) => {
      toast.error('Napaka pri kalibriranju elektrarne');
      return;
    });

    setTimeout(() => {
      toast.success('Wuhooo! Sedaj lahko začnete z uporabo aplikacije.');
      Router.push('/dashboard');
    }, 2000);
  };

  if (loading || powerPlantsLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <Auth>
      <ToastContainer />
      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dobrodošli! Še zadnji korak...</h2>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Prosimo, da naslednje podatke izpolnite z največjo možnjo natančnostjo. <br />
          To nam bo pomagalo, da vam zagotovimo najboljšo izkušnjo.
        </div>
        <form className="mt-8 space-y-6" action="" onSubmit={handleSubmit(onSubmit)}>
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
            {errors.name && <p className="text-red-400">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Moč
            </label>
            <input
              type="text"
              {...register('power', { required: 'Velikost elektrarne je obvezno polje' })}
              name="power"
              id="power"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Moč"
              required
            />
            {errors.power && <p className="text-red-400">{errors.power.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokacija</label>

            <div className="h-72 w-full">
              <MapboxMap initialOptions={{ center: [+lng, +lat], zoom: +zoom }} onCreated={onMapCreated} />
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
