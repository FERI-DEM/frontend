import { CommunityRes } from '@/types/community.types';
import MapboxMap from '../Maps/Map';
import mapboxgl from 'mapbox-gl';
import { User } from '@/types/user.types';

interface Props {
    communities: CommunityRes[] | undefined;
    communityMembers: User[] | undefined;
}

export default function CommunityMembers({ communities, communityMembers }: Props) {
    return (
        <>
            {communities?.map((community) => {
                const communityAdmin = communityMembers?.find((x) => x._id === community.adminId);
                return (
                    <div key={community._id}>
                        <h1 className="text-lg font-extrabold dark:text-white mb-2 ml-1">
                            <mark className="px-2 py-1.5 text-white bg-amber-700 rounded dark:bg-amber-800">
                                {community.name}
                            </mark>
                            <small className="ml-2 text-xs font-thin text-gray-500 dark:text-gray-400">
                                (Administrator: {communityAdmin?.email})
                            </small>
                        </h1>

                        {community.members.map((member, index) => {
                            const memberDetail = communityMembers?.find((x) => x._id === member.userId);
                            const memberPowerPlantDetail = memberDetail?.powerPlants?.find(
                                (x) => x._id === member.powerPlantId
                            );
                            return (
                                <div
                                    key={community._id + index}
                                    className="inline-flex items-center gap-4 w-full hover:shadow-lg p-5 text-gray-800 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-amber-300 dark:border-gray-900 hover:text-amber-600 hover:bg-gray-50 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800"
                                >
                                    {memberPowerPlantDetail && (
                                        <div className="h-24 w-52">
                                            <MapboxMap
                                                initialOptions={{
                                                    center: [
                                                        memberPowerPlantDetail.longitude,
                                                        memberPowerPlantDetail.latitude,
                                                    ],
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
                                                        .setLngLat([
                                                            memberPowerPlantDetail.longitude,
                                                            memberPowerPlantDetail.latitude,
                                                        ])
                                                        .addTo(map);
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="block">
                                        {(memberPowerPlantDetail && (
                                            <>
                                                <div className="w-full text-2xl font-semibold">
                                                    {memberPowerPlantDetail?.displayName}
                                                </div>
                                            </>
                                        )) || (
                                            <p className="text-lg font-normal">
                                                Elektrarna je bila odstranjena s strani lastnika.
                                            </p>
                                        )}
                                        <div className="w-full text-sm">Lastnik elektrarne: {memberDetail?.email}</div>
                                    </div>
                                </div>
                            );
                        })}
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    </div>
                );
            })}
        </>
    );
}
