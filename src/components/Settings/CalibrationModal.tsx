const CalibrationModal = ({ onSubmit = () => {}, closeModal = () => {} }) => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full bg-opacity-40 bg-black">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Uredi elektrarno</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeModal}
                        >
                            <span className="material-symbols-rounded">close</span>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <form className="space-y-6" action="" onSubmit={onSubmit}>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalibrationModal;