import { CommunityRes } from '@/types/community.types';
import { User } from '@/types/user.types';
import CommunityListCard from './CommunityListCard';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useState } from 'react';
import ConfirmDeleteModal from '../UI/ConfirmDeleteModal';
import CommunityEdit from './CommunityEdit';
import CommunityService from '@/api/community.service';
import { toast } from 'react-toastify';

interface Props {
    community: CommunityRes;
    communityAdmin: User | undefined;
    communityMembers: User[] | undefined;
    showActions?: boolean;
}

export default function CommunityList({ community, communityAdmin, communityMembers, showActions = false }: Props) {
    const { currentUser } = useCurrentUser();
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<boolean | undefined>(false);
    const [showCommunityUpdateModal, setShowCommunityUpdateModal] = useState<boolean | undefined>(false);

    const isAdmin = currentUser?.id === community?.adminId;

    const removeCommunity = async () => {
        if (community) {
            await CommunityService.deleteCommunity(community._id)
                .then(() => {
                    toast.success('Wuhooo! Uspešno ste odstranili skupnost.');
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
                <h1 className="text-lg font-extrabold dark:text-white mb-2 ml-1">
                    <mark className="px-2 py-1.5 text-white bg-amber-700 rounded dark:bg-amber-800">
                        {community?.name}
                    </mark>
                    <small className="ml-2 text-xs font-thin text-gray-500 dark:text-gray-400">
                        (Administrator: {communityAdmin?.email})
                    </small>

                    {showActions && isAdmin && (
                        <>
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
                        </>
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
        </>
    );
}
