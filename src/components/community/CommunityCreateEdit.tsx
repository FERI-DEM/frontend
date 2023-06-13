import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

interface Props {
    openModal: any;
    setOpenModal: any;
}

export default function CommunityCreateEdit({ openModal, setOpenModal }: Props) {
    const props = { openModal, setOpenModal };

    return (
        <>
            <Modal
                show={props.openModal === 'form-elements'}
                size="md"
                popup
                onClose={() => props.setOpenModal(undefined)}
            >
                <Modal.Body className="pt-3">
                    <div>
                        <div>
                            <input
                                type="text"
                                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Ime skupnosti"
                            />
                        </div>
                        <div className="w-full mt-3">
                            <button
                                type="button"
                                className="text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-400 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-amber-900"
                            >
                                Ustvari skupnost
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
