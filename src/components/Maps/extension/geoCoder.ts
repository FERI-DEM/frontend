import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';

const geoCoder = () => {
    const geocoder = new MapboxGeocoder({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string,
        mapboxgl: mapboxgl,
        marker: false,
        placeholder: 'Poiščite lokacijo...',
    });

    return geocoder;
}

export {
    geoCoder
}