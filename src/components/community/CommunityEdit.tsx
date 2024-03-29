import { Varela_Round } from '@next/font/google';
import { Modal } from 'flowbite-react';
import CommunityService from '@/api/community.service';
import { toast } from 'react-toastify';
import { CommunityRes } from '@/types/community.types';
import { useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import { CacheKey } from '@/types/caching.types';

interface Props {
    community: CommunityRes;
    openModal: boolean | undefined;
    setOpenModal: (isOpen: boolean | undefined) => void;
}

const varelaRound = Varela_Round({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-varela-round',
});

export default function CommunityEdit({ community, openModal, setOpenModal }: Props) {
    const { mutate } = useSWRConfig();
    const [communityName, setCommunityName] = useState<string>(community?.name);
    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = async (event: any) => {
        event.preventDefault();

        const communityName: string = event.target.communityName.value;

        if (community && communityName && communityName.length > 0) {
            await CommunityService.updateCommunity(community?._id, {
                name: event.target.communityName.value,
            })
                .then(() => {
                    toast.success('Wuhooo! Uspešno ste posodobili skupnost.');
                    mutate(CacheKey.COMMUNITIES);
                })
                .catch(() => {
                    toast.error('Ooops! Prišlo je do napake pri posodabljanju skupnosti.');
                })
                .finally(() => setOpenModal(false));
        } else {
            toast.warn('Ooops! Izpolniti morate vsa obvezna polja.');
        }
    };

    const handleChange = (e: any) => {
        e.preventDefault();
        setCommunityName(e.target.value);
    };

    return (
        <>
            <Modal
                className={`${varelaRound.className}`}
                dismissible
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>Uredi skupnost</Modal.Header>

                <form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div className="space-y-6">
                            <input
                                ref={inputRef}
                                type="text"
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Ime skupnosti"
                                name="communityName"
                                value={communityName}
                                onChange={handleChange}
                                onBlur={(e) => e.target.focus()}
                                required
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="submit"
                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                        >
                            Shrani
                        </button>

                        <button
                            type="button"
                            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={() => setOpenModal(false)}
                        >
                            Prekliči
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
