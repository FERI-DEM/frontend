import { PowerPlant } from '@/types/power-plant.type';
import { Varela_Round } from '@next/font/google';
import { Modal } from 'flowbite-react';
import CommunityService from '@/api/community.service';
import { useState } from 'react';

interface Props {
    openModal: boolean | undefined;
    setOpenModal: (isOpen: boolean | undefined) => void;
    powerPlants: PowerPlant[] | undefined;
}

const varelaRound = Varela_Round({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-varela-round',
});

export default function CommunityCreateEdit({ openModal, setOpenModal, powerPlants }: Props) {
    const [selectedCommunityPowerPlants, setSelectedCommunityPowerPlants] = useState<string[]>([]);

    const handlePowerPlantChange = (event: any) => {
        if (event.target.checked) {
            setSelectedCommunityPowerPlants(
                Array.from(new Set<string>([...selectedCommunityPowerPlants, event.target.value]))
            );
        } else {
            if (selectedCommunityPowerPlants?.some((x) => x === event.target.value)) {
                const newSelectedPowerPlants = selectedCommunityPowerPlants.filter((x) => x !== event.target.value);
                setSelectedCommunityPowerPlants(newSelectedPowerPlants);
            }
        }
    };

    const onSubmit = async (event: any) => {
        event.preventDefault();
        await CommunityService.createCommunity({
            name: event.target.communityName.value,
            powerPlants: [...selectedCommunityPowerPlants?.map((x) => ({ powerPlantId: x }))],
        }).finally(() => setOpenModal(false));
    };

    return (
        <>
            <Modal
                className={`${varelaRound.className}`}
                dismissible
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>Ustvari skupnost</Modal.Header>

                <form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Ime skupnosti"
                                    name="communityName"
                                    required
                                />
                            </div>
                            <div>
                                <h3 className="mb-5 text-normal font-medium text-gray-900 dark:text-white">
                                    Izberite svoje elektrarne, ki jih želite dodati v skupnost:
                                </h3>
                                {powerPlants?.map((powerPlant, index) => {
                                    return (
                                        <div key={`CommunityCreateEditCheckbox${index}`}>
                                            <input
                                                type="checkbox"
                                                id={`CommunityCreateEdit${index}`}
                                                value={powerPlant._id}
                                                className="hidden peer"
                                                name="selectCommunityPowerPlants"
                                                onChange={handlePowerPlantChange}
                                            />
                                            <label
                                                htmlFor={`CommunityCreateEdit${index}`}
                                                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-amber-300 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold">
                                                        {powerPlant.displayName}
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
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
