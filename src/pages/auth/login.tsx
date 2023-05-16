import Auth from '@/layouts/Auth';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

interface LoginType {
    email: string;
    password: string;
}

export default function Login() {
    const { signinWithEmail, signinWithGoogle, signinWithMicrosoft } = useAuth();

    const methods = useForm<LoginType>({ mode: 'onBlur' });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const onSubmit = async (data: LoginType) => {
        try {
            await signinWithEmail(data.email, data.password, '/onboarding');
        } catch (error: any) {
            toast.error('Napaka pri prijavi, prosimo poizkusite ponovno.');
        }
    };

    return (
        <Auth>
            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in to platform</h2>
                <FormProvider {...methods}>
                    <form className="mt-8 space-y-6" action="" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="name@mail.com"
                                required
                            />
                            {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your password
                            </label>
                            <input
                                type="password"
                                {...register('password', { required: 'Password is required' })}
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required
                            />
                            {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                        </div>
                        <div className="flex items-start">
                            <button
                                type="submit"
                                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Login to your account
                            </button>
                            <a
                                href="#"
                                className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
                            >
                                Lost Password?
                            </a>
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Not registered?{' '}
                            <Link
                                href={{
                                    pathname: '/auth/register',
                                }}
                                className="text-primary-700 hover:underline dark:text-primary-500"
                            >
                                Create account
                            </Link>
                        </div>
                    </form>
                </FormProvider>
                <hr />
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="text-muted bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-100 mr-2 mb-2"
                        onClick={() => signinWithGoogle('/onboarding')}
                    >
                        <svg
                            className="w-4 h-4 mr-2 -ml-1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="705.6"
                            height="720"
                            viewBox="0 0 186.69 190.5"
                        >
                            <g transform="translate(1184.583 765.171)">
                                <path
                                    clipPath="none"
                                    mask="none"
                                    d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                                    fill="#4285f4"
                                />
                                <path
                                    clipPath="none"
                                    mask="none"
                                    d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                                    fill="#34a853"
                                />
                                <path
                                    clipPath="none"
                                    mask="none"
                                    d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                                    fill="#fbbc05"
                                />
                                <path
                                    d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                                    fill="#ea4335"
                                    clipPath="none"
                                    mask="none"
                                />
                            </g>
                        </svg>
                        Sign in with Google
                    </button>
                    <button
                        type="button"
                        className="text-muted bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-100 mr-2 mb-2"
                        onClick={() => signinWithMicrosoft('/onboarding')}
                    >
                        <svg className="w-5 h-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23">
                            <path fill="#f35325" d="M1 1h10v10H1z" />
                            <path fill="#81bc06" d="M12 1h10v10H12z" />
                            <path fill="#05a6f0" d="M1 12h10v10H1z" />
                            <path fill="#ffba08" d="M12 12h10v10H12z" />
                        </svg>
                        Sign in with Microsoft
                    </button>
                </div>
            </div>
        </Auth>
    );
}
