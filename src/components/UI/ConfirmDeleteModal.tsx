import { Varela_Round } from '@next/font/google';
import { Button, Modal } from 'flowbite-react';

interface Props {
    openModal: boolean | undefined;
    closeModal: (isOpen: boolean | undefined) => void;
    deleteItem: () => void;
}

const varelaRound = Varela_Round({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-varela-round',
});

export default function ConfirmDeleteModal({ openModal, closeModal, deleteItem }: Props) {
    return (
        <>
            <Modal
                className={varelaRound.className}
                show={openModal}
                size="md"
                dismissible
                popup
                onClose={() => closeModal(false)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <span className="material-symbols-rounded material-font-size-8xl mx-auto mb-4 text-gray-400 dark:text-gray-200">
                            error
                        </span>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Ali ste prepričani da želite izvesti to akcijo?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={deleteItem}>
                                Ja, sem prepričan
                            </Button>
                            <Button color="gray" onClick={() => closeModal(false)}>
                                Ne, prekliči
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
