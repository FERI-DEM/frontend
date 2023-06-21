import { CommunityRes, JoinCommunityNotification } from '@/types/community.types';
import { User } from '@/types/user.types';
import CommunityListCard from './CommunityListCard';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useState } from 'react';
import ConfirmDeleteModal from '../UI/ConfirmDeleteModal';
import CommunityEdit from './CommunityEdit';
import CommunityService from '@/api/community.service';
import { toast } from 'react-toastify';
import CommunityRequestsToJoin from './CommunityRequestsToJoin';
import { useSWRConfig } from 'swr';
import { CacheKey } from '@/types/caching.types';

interface Props {
    community: CommunityRes;
    communityAdmin: User | undefined;
    communityMembers: User[] | undefined;
    showActions?: boolean;
    notifications?: JoinCommunityNotification[] | undefined;
}

export default function CommunityList({
    community,
    communityAdmin,
    communityMembers,
    showActions = false,
    notifications,
}: Props) {
    const { mutate } = useSWRConfig();
    const { currentUser } = useCurrentUser();
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<boolean | undefined>(false);
    const [showCommunityUpdateModal, setShowCommunityUpdateModal] = useState<boolean | undefined>(false);
    const [showCommunityRequestsToJoinModal, setShowCommunityRequestsToJoinModal] = useState<boolean | undefined>(
        false
    );

    const isAdmin = currentUser?.id === community?.adminId;

    const removeCommunity = async () => {
        if (community) {
            await CommunityService.deleteCommunity(community._id)
                .then(() => {
                    toast.success('Wuhooo! Uspešno ste odstranili skupnost.');
                    mutate(CacheKey.COMMUNITIES);
                })
                .catch(() => {
                    toast.error('Ooops! Prišlo je do napake pri odstranjevanju skupnosti.');
                })
                .finally(() => setShowConfirmDeleteModal(false));
        } else {
            toast.warn('Ooops! Izpolniti morate vsa obvezna polja.');
        }
    };

    return (
        <>
            <div>
                <h1 className="flex items-center text-lg font-extrabold dark:text-white mb-2 ml-1">
                    <div>
                        <mark className="px-2 py-1.5 text-white bg-amber-700 rounded dark:bg-amber-800">
                            {community?.name}
                        </mark>
                        <small className="ml-2 text-xs font-thin text-gray-500 dark:text-gray-400">
                            (Administrator: {communityAdmin?.email})
                        </small>
                    </div>

                    {showActions && isAdmin && (
                        <div className="flex">
                            <div>
                                <button
                                    className="inline-flex ml-3 items-center px-3 py-1 mr-1 text-xs font-medium text-center text-white bg-sky-700 rounded-full hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                                    onClick={() => setShowCommunityUpdateModal(true)}
                                >
                                    <span className="material-symbols-rounded material-filled material-font-size-xs -ml-0.5 mr-1.5">
                                        edit
                                    </span>
                                    Uredi skupnost
                                </button>

                                <button
                                    className="inline-flex ml-1 disabled:bg-slate-400 items-center px-3 py-1 text-xs font-medium text-center text-white bg-red-700 rounded-full hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    onClick={() => setShowConfirmDeleteModal(true)}
                                >
                                    <span className="material-symbols-rounded material-filled material-font-size-xs -ml-0.5 mr-1.5">
                                        delete_forever
                                    </span>
                                    <span>Odstrani skupnost</span>
                                </button>
                            </div>

                            <div>
                                <button
                                    className="relative inline-flex ml-1 disabled:bg-slate-400 items-center px-3 py-1 text-xs font-medium text-center text-white bg-amber-700 rounded-full hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                                    onClick={() => setShowCommunityRequestsToJoinModal(true)}
                                >
                                    <span className="material-symbols-rounded material-filled material-font-size-xs -ml-0.5 mr-1.5">
                                        group_add
                                    </span>
                                    <span>Prošnje za pridružitev</span>

                                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-thin text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                                        {notifications?.length ?? 0}
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </h1>

                {community?.members?.map((member, index) => {
                    const memberDetail = communityMembers?.find((x) => x._id === member.userId);
                    const memberPowerPlantDetail = memberDetail?.powerPlants?.find(
                        (x) => x._id === member.powerPlantId
                    );
                    return (
                        <CommunityListCard
                            key={`CommunityList${community?._id + index}`}
                            community={community}
                            memberDetail={memberDetail}
                            memberPowerPlantDetail={memberPowerPlantDetail}
                            showActions={showActions}
                            isAdmin={isAdmin}
                        />
                    );
                })}
            </div>

            {showConfirmDeleteModal && (
                <ConfirmDeleteModal
                    openModal={showConfirmDeleteModal}
                    closeModal={setShowConfirmDeleteModal}
                    deleteItem={removeCommunity}
                />
            )}

            {showActions && (
                <CommunityEdit
                    community={community}
                    openModal={showCommunityUpdateModal}
                    setOpenModal={setShowCommunityUpdateModal}
                />
            )}

            {showCommunityRequestsToJoinModal && (
                <CommunityRequestsToJoin
                    openModal={showCommunityRequestsToJoinModal}
                    setOpenModal={setShowCommunityRequestsToJoinModal}
                    notifications={notifications}
                />
            )}
        </>
    );
}
