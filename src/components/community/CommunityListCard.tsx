import { PowerPlant } from '@/types/power-plant.type';
import { User } from '@/types/user.types';
import MapboxMap from '../Maps/Map';
import mapboxgl from 'mapbox-gl';
import { useState } from 'react';
import ConfirmDeleteModal from '../UI/ConfirmDeleteModal';
import { toast } from 'react-toastify';
import useCurrentUser from '@/hooks/useCurrentUser';
import CommunityService from '@/api/community.service';
import { CommunityRes } from '@/types/community.types';

interface Props {
    community: CommunityRes | undefined;
    memberDetail: User | undefined;
    memberPowerPlantDetail: PowerPlant | undefined;
    showActions?: boolean;
    isAdmin?: boolean;
}

export default function CommunityListCard({
    community,
    memberDetail,
    memberPowerPlantDetail,
    showActions,
    isAdmin,
}: Props) {
    const { currentUser } = useCurrentUser();
    const [showConfirmRemoveFromCommunityModal, setShowConfirmRemoveFromCommunityModal] = useState<boolean>(false);
    const [showConfirmLeaveCommunityModal, setShowConfirmLeaveCommunityModal] = useState<boolean>(false);
    const isOwnPowerPlant = currentUser?.id === memberDetail?._id;

    const removeFromCommunity = async () => {
        if (isAdmin && community && memberDetail && memberPowerPlantDetail) {
            await CommunityService.removeCommunityMember(community?._id, memberDetail?._id, memberPowerPlantDetail?._id)
                .then(() => {
                    toast.success('Wuhooo! Uspešno ste odstranili člana skupnosti.');
                })
                .catch(() => {
                    toast.error('Ooops! Prišlo je do napake pri odstranjevanju člana skupnosti.');
                })
                .finally(() => setShowConfirmRemoveFromCommunityModal(false));
        } else {
            toast.warn('Ooops! Težave pri odstranjevanju člana skupnosti.');
        }
    };

    const leaveCommunity = async () => {
        if (isOwnPowerPlant && community && memberPowerPlantDetail) {
            await CommunityService.leaveCommunity(community?._id, memberPowerPlantDetail?._id)
                .then(() => {
                    toast.success('Wuhooo! Uspešno ste zapustili skupnost.');
                })
                .catch(() => {
                    toast.error('Ooops! Prišlo je do napake pri zapuščanju skupnosti.');
                })
                .finally(() => setShowConfirmLeaveCommunityModal(false));
        } else {
            toast.warn('Ooops! Težave pri zapuščanju skupnosti.');
        }
    };

    return (
        <>
            <div className="inline-flex items-center gap-4 justify-between w-full hover:shadow-lg p-5 text-gray-800 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-amber-300 dark:border-gray-900 hover:text-amber-600 hover:bg-gray-50 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-800">
                <div className="inline-flex items-center gap-4">
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
                                <div className="w-full text-2xl font-semibold">
                                    {memberPowerPlantDetail?.displayName}
                                </div>
                            </>
                        )) || <p className="text-lg font-normal">Elektrarna je bila odstranjena s strani lastnika.</p>}
                        <div className="w-full text-sm">Lastnik elektrarne: {memberDetail?.email}</div>
                    </div>
                </div>

                {(showActions && isAdmin && !isOwnPowerPlant && (
                    <>
                        <button
                            className="inline-flex disabled:bg-slate-400 items-center px-2.5 py-1 text-xs font-medium text-center text-white bg-red-700 rounded-full hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            onClick={() => setShowConfirmRemoveFromCommunityModal(true)}
                        >
                            <span className="material-symbols-rounded material-font-size-lg mr-2">delete_forever</span>
                            <span>Odstrani člana</span>
                        </button>
                    </>
                )) ||
                    (showActions && isOwnPowerPlant && (
                        <>
                            <button
                                className="inline-flex disabled:bg-slate-400 items-center px-2.5 py-1 text-xs font-medium text-center text-white bg-red-700 rounded-full hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={() => setShowConfirmLeaveCommunityModal(true)}
                            >
                                <span className="material-symbols-rounded material-font-size-lg mr-2">
                                    delete_forever
                                </span>
                                <span>Zapusti skupnost</span>
                            </button>
                        </>
                    ))}
            </div>

            {showActions && showConfirmRemoveFromCommunityModal && (
                <>
                    <ConfirmDeleteModal
                        key={`RemoveFromCommunity${community?._id}${memberDetail?._id}${memberPowerPlantDetail?._id}`}
                        closeModal={() => setShowConfirmRemoveFromCommunityModal(false)}
                        deleteItem={removeFromCommunity}
                    />
                </>
            )}

            {showActions && showConfirmLeaveCommunityModal && (
                <>
                    <ConfirmDeleteModal
                        key={`LeaveCommunity${community?._id}${memberDetail?._id}${memberPowerPlantDetail?._id}`}
                        closeModal={() => setShowConfirmLeaveCommunityModal(false)}
                        deleteItem={leaveCommunity}
                    />
                </>
            )}
        </>
    );
}
