import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, 'container'>;
  onCreated?(map: mapboxgl.Map): void;
  onLoaded?(map: mapboxgl.Map): void;
  onRemoved?(): void;
}

function MapboxMap({ initialOptions = {}, onCreated, onLoaded, onRemoved }: MapboxMapProps) {
  const [map, setMap] = useState<mapboxgl.Map>();

  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;

    if (typeof window === 'undefined' || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [15.646, 46.554],
      zoom: 10,
      ...initialOptions,
    });
    
    const marker = new mapboxgl.Marker({
      color: "RED",
      draggable: true
    })

    const add_marker = (event:any) => {
      var coordinates = event.lngLat;
      console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
      marker.setLngLat(coordinates).addTo(mapboxMap);
    }

    mapboxMap.on('click', add_marker.bind(mapboxMap));

    mapboxMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    setMap(mapboxMap);
    if (onCreated) onCreated(mapboxMap);

    if (onLoaded) mapboxMap.once('load', () => onLoaded(mapboxMap));

    return () => {
      mapboxMap.remove();
      setMap(undefined);
      if (onRemoved) onRemoved();
    };
  }, []);

  return <div ref={mapNode} style={{ width: '100%', height: '100%' }} />;
}

export default MapboxMap;