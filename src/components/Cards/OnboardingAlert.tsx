import usePowerPlants from '@/hooks/usePowerPlants';
import Link from 'next/link';

const OnboardingAlert = () => {
    const { powerPlants, powerPlantsError, powerPlantsLoading } = usePowerPlants();

    if (
        (powerPlantsLoading && !powerPlantsError) ||
        (powerPlants && powerPlants.length > 0 && powerPlants.every((x) => x.calibration && x.calibration.length > 0))
    ) {
        return <></>;
    }

    return (
        <div
            className="p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert"
        >
            <div className="flex items-center">
                <div className="flex items-center">
                    <span className="material-symbols-outlined material-font-size-2xl material-filled mr-2">error</span>
                    <span className="relative flex h-6 w-6">
                        <span className="h-6 w-6 animate-ping absolute h-full w-full rounded-full bg-yellow-400 opacity-75 right-8"></span>
                    </span>
                </div>
                <h3 className="text-lg font-medium -ml-5">Dobrodošli! Dokončati morate še nekaj nastavitev ...</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
                {((!powerPlants || (powerPlants && powerPlants.length === 0)) &&
                    `V sistemu ni bilo zaznane vaše elektrarne. Da vam lahko zagotovimo kar se da najboljšo izkušnjo,
                    prosimo, da dodate v sistem, vsaj eno elektrarno.`) ||
                    (powerPlants?.some((x) => !x.calibration || x.calibration?.length === 0) &&
                        `V sistemu smo zaznali elektrarno, za katero nimamo podatkov. Da vam lahko zagotovimo kar se da najboljšo izkušnjo,
                    prosimo, da kalibrirate vaše elektrarne.`)}
            </div>
            <div className="flex">
                <button
                    type="button"
                    className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800"
                >
                    {((!powerPlants || (powerPlants && powerPlants.length === 0)) && (
                        <Link href="/onboarding">Hitro nastavi</Link>
                    )) ||
                        (powerPlants?.some((x) => !x.calibration || x.calibration?.length === 0) && (
                            <Link href="/dashboard/settings">Kalibriraj</Link>
                        ))}
                </button>
            </div>
        </div>
    );
};

export default OnboardingAlert;
