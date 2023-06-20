import { OnboardingType } from "@/pages/onboarding";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type PlantNameInputProps = {
    register: UseFormRegister<OnboardingType>;
    errors: FieldErrors<OnboardingType>;
};

export const PlantNameInput = ({ register, errors } : PlantNameInputProps) => {
    return (
        <>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ime elektrarne
            </label>
            <input
                type="text"
                {...register('name', { required: 'Ime elektrarne je obvezno polje' })}
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Ime elektrarne"
                required
            />
            {errors.name && <p className="mt-2 text-red-400">{errors.name.message}</p>}
        </>
    );
};
