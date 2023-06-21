import { OnboardingType } from "@/pages/onboarding";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type PlantPowerInputProps = {
    register: UseFormRegister<OnboardingType>;
    errors: FieldErrors<OnboardingType>;
    power: number;
    setPower: (power: number) => void;
};

export const PlantPowerInput = ({ register, errors, power, setPower }: PlantPowerInputProps) => {

    const handleMaxPowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPower(parseInt(event.target.value));
    };

    return (
        <>
            <small className="block mb-2 font-medium text-gray-900 dark:text-white">Izbrana moč elektrarne: {power} kW</small>
            <input
                id="maxPower"
                {...register('power', { required: 'Moč elektrarne je obvezno polje' })}
                name="maxPower"
                type="range"
                min="0"
                max="900"
                value={power}
                onChange={handleMaxPowerChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                required
            />
            {errors.power && <p className="mt-2 text-red-400">{errors.power.message}</p>}
        </>
    );
}