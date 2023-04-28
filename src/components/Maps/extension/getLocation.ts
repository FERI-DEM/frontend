import mapboxgl from 'mapbox-gl';

const getLocation = () => {
        const location = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showAccuracyCircle: false,
        });

        return location;

}

export {
    getLocation
}