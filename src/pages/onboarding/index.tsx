import Auth from '@/layouts/Auth';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import PowerPlantsService from '@/api/power-plants.service';
import { PowerPlantCreateReq, CalibrationReq, PowerPlant } from '../../types/power-plant.type';
import MapboxMap from '@/components/Maps/Map';
import { useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';

interface OnboardingType {
  name: string;
  power: number;
  location: {
    longitude: number;
    latitude: number;
  };
}

export default function Calibration() {
  const methods = useForm<OnboardingType>({ mode: 'onBlur' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [viewport, setViewport] = useState({
    center: ['15.646', '46.554'],
    zoom: '9.00',
  });

  const {
    center: [lng, lat],
    zoom,
  } = viewport;

  const onMapCreated = useCallback((map: mapboxgl.Map) => {
    const marker = new mapboxgl.Marker({
      color: "RED",
      draggable: true
    })

    const saveCoordinates = () => {
      const lngLat = marker.getLngLat();
      setViewport({center: [lngLat.lng.toFixed(4).toString(), lngLat.lat.toFixed(4).toString()], zoom: '9.00'});
    }

    marker.on('dragend', saveCoordinates);

    const addMarker = (event:any) => {
      let coordinates = event.lngLat;
      marker.setLngLat(coordinates).addTo(map);
      saveCoordinates();
    }

    map.on('click', addMarker.bind(map));
  }, []);

  const onSubmit = async (data: OnboardingType) => {
    console.log(data);
    const powerPlantData: PowerPlantCreateReq = {
      displayName: data.name,
      latitude: +data.location.latitude,
      longitude: +data.location.longitude,
    };
    const powerPlant: PowerPlant = await PowerPlantsService.createPowerPlant(powerPlantData);

    const calibrationData: CalibrationReq = {
      id: powerPlant._id,
      power: data.power,
    };

    await PowerPlantsService.calibration(calibrationData);

    Router.push('/dashboard');
  };

  return (
    <Auth>
      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Onboarding</h2>
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
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Lokacija
            </label>
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
