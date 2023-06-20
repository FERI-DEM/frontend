import MapboxMap from "@/components/Maps/Map";
import { OnboardingType } from "@/pages/onboarding";
import { useCallback, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import mapboxgl from 'mapbox-gl';
import { geoCoder } from "@/components/Maps/extension/geoCoder";

type PlantLocationInputProps = {
    register: UseFormRegister<OnboardingType>;
    errors: FieldErrors<OnboardingType>;
    onViewportChange: (newViewport: {
        center: { lng: number; lat: number };
        zoom: number;
    }) => void;
};

export const PlantLocationInput = ({ register, errors, onViewportChange }: PlantLocationInputProps) => {

    const [viewport, setViewport] = useState<{
        center: { lng: number; lat: number };
        zoom: number;
    }>({ center: { lng: 15.646, lat: 46.554 }, zoom: 10.0 });

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
            const newViewport = {
                center: { lng: +center[0].toFixed(4).toString(), lat: +center[1].toFixed(4).toString() },
                zoom: 10.0,
            };
            setViewport(newViewport);
            onViewportChange(newViewport); // Emit the updated viewport
        });

        const saveCoordinates = () => {
            const lngLat = marker.getLngLat();
            const newViewport = {
                center: { lng: +lngLat.lng.toFixed(4).toString(), lat: +lngLat.lat.toFixed(4).toString() },
                zoom: 10.0,
            };
            setViewport(newViewport);
            onViewportChange(newViewport); // Emit the updated viewport
        };

        marker.on('dragend', saveCoordinates);

        const addMarker = (event: any) => {
            let coordinates = event.lngLat;
            marker.setLngLat(coordinates).addTo(map);
            saveCoordinates();
        };

        map.on('click', addMarker.bind(map));
    }, [onViewportChange]);

    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokacija</label>

            <div className="h-72 w-full">
                <MapboxMap
                    initialOptions={{ center: [+lng, +lat], zoom: +zoom }}
                    onCreated={onMapCreated}
                />
            </div>
        </>
    );
}