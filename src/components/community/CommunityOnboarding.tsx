interface Props {
    setOpenCreateCommunityModal: (isOpen: boolean | undefined) => void;
    setOpenJoinCommunityModal: (isOpen: boolean | undefined) => void;
}

export default function CommunityOnboarding({ setOpenCreateCommunityModal, setOpenJoinCommunityModal }: Props) {
    return (
        <>
            <div className="text-center pt-52">
                <span className="material-symbols-rounded material-font-size-9xl text-gray-900 dark:text-white">
                    hub
                </span>
                <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
                    Dobrodošli v skupnostih
                </h1>
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    Trenutno še niste član energetske skupnosti, pridružite se obstoječi ali ustvarite svojo.
                </p>

                <div>
                    <button
                        className="inline-flex items-center justify-center mr-2 px-5 py-3 text-base font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-900"
                        onClick={() => setOpenCreateCommunityModal(true)}
                    >
                        Ustvari skupnost
                        <span className="material-symbols-rounded ml-2 -mr-1">add</span>
                    </button>
                    <button
                        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-900"
                        onClick={() => setOpenJoinCommunityModal(true)}
                    >
                        Pridruži se skupnosti
                        <span className="material-symbols-rounded ml-2 -mr-1">send</span>
                    </button>
                </div>
            </div>
        </>
    );
}
