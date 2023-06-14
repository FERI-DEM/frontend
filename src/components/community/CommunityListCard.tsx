import { PowerPlant } from '@/types/power-plant.type';
import { User } from '@/types/user.types';
import MapboxMap from '../Maps/Map';
import mapboxgl from 'mapbox-gl';

interface Props {
    memberDetail: User | undefined;
    memberPowerPlantDetail: PowerPlant | undefined;
}

export default function CommunityListCard({ memberDetail, memberPowerPlantDetail }: Props) {
    return (
        <>
            <div className="inline-flex items-center gap-4 w-full hover:shadow-lg p-5 text-gray-800 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-amber-300 dark:border-gray-900 hover:text-amber-600 hover:bg-gray-50 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800">
                {memberPowerPlantDetail && (
                    <div className="h-24 w-52">
                        <MapboxMap
                            initialOptions={{
                                center: [memberPowerPlantDetail.longitude, memberPowerPlantDetail.latitude],
                                zoom: 12.0,
                            }}
                            className="rounded-lg"
                            disabled={true}
                            onLoaded={(map: mapboxgl.Map) => {
                                const marker = new mapboxgl.Marker({
                                    color: 'RED',
                                    draggable: false,
                                });

                                marker
                                    .setLngLat([memberPowerPlantDetail.longitude, memberPowerPlantDetail.latitude])
                                    .addTo(map);
                            }}
                        />
                    </div>
                )}
                <div className="block">
                    {(memberPowerPlantDetail && (
                        <>
                            <div className="w-full text-2xl font-semibold">{memberPowerPlantDetail?.displayName}</div>
                        </>
                    )) || <p className="text-lg font-normal">Elektrarna je bila odstranjena s strani lastnika.</p>}
                    <div className="w-full text-sm">Lastnik elektrarne: {memberDetail?.email}</div>
                </div>
            </div>
        </>
    );
}
