import { Varela_Round } from '@next/font/google';
import { Modal } from 'flowbite-react';
import CommunityService from '@/api/community.service';
import { toast } from 'react-toastify';
import { JoinCommunityNotification } from '@/types/community.types';

interface Props {
    openModal: boolean | undefined;
    setOpenModal: (isOpen: boolean | undefined) => void;
    notifications: JoinCommunityNotification[] | undefined;
}

const varelaRound = Varela_Round({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-varela-round',
});

export default function CommunityRequestsToJoin({ openModal, setOpenModal, notifications }: Props) {
    const onPressProcessJoinRequest = async (accepted: boolean, notification: JoinCommunityNotification) => {
        if (notification) {
            await CommunityService.processJoinCommunity({ accepted, notificationId: notification.id })
                .then(() => {
                    toast.success('Wuhooo! Prošnja za pridružitev, je bila uspešno procesirana.');
                })
                .catch(() => {
                    toast.error('Ooops! Prišlo je do napake pri procesiranju prošnje za pridružitev.');
                });
        } else {
            toast.warn('Ooops! Prošnja za pridružitev ni popolna.');
        }
    };

    return (
        <>
            <Modal
                className={`${varelaRound.className}`}
                dismissible
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>Prošnje za pridružitev skupnosti</Modal.Header>

                <div className="space-y-6 p-3">
                    <div>
                        {(notifications &&
                            notifications.length > 0 &&
                            notifications?.map((notification, index) => {
                                return (
                                    <div key={`CommunityRequestsToJoin${index}${notification}`}>
                                        <div className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-amber-300 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                            <div className="block">
                                                <div className="text-xs font-semibold">{notification.data.message}</div>
                                            </div>

                                            <div className="flex">
                                                <button
                                                    className="inline-flex ml-1 disabled:bg-slate-400 items-center px-3 py-1 text-xs font-medium text-center text-white bg-red-700 rounded-full hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                    onClick={() => onPressProcessJoinRequest(false, notification)}
                                                >
                                                    <span className="material-symbols-rounded material-filled material-font-size-xs -ml-0.5 mr-1.5">
                                                        delete_forever
                                                    </span>
                                                    <span>Zavrni</span>
                                                </button>

                                                <button
                                                    className="inline-flex ml-1 disabled:bg-slate-400 items-center px-3 py-1 text-xs font-medium text-center text-white bg-emerald-700 rounded-full hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                                                    onClick={() => onPressProcessJoinRequest(true, notification)}
                                                >
                                                    <span className="material-symbols-rounded material-filled material-font-size-xs -ml-0.5 mr-1.5">
                                                        done
                                                    </span>
                                                    <span>Sprejmi</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })) || (
                            <p className="mb-5 text-sm font-medium text-gray-900 dark:text-white">
                                Trenutno nimate nobenih prošenj za pridružitev skupnosti
                            </p>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
}
