import Auth from '@/layouts/Auth';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';

interface SignupType {
  email: string;
  password: string;
  password_confirm: string;
}

export default function Register() {
  const { signUpWithEmail } = useAuth();

  const methods = useForm<SignupType>({ mode: 'onBlur' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: SignupType) => {
    console.log(data);
    try {
      await signUpWithEmail(data.email, data.password, '/dashboard');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Auth>
      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create a Free Account
        </h2>
        <FormProvider {...methods}>
          <form
            className="mt-8 space-y-6"
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
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
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
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
              {errors.password && (
                <p className="text-red-400">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                {...register('password_confirm', {
                  required: 'Verify your password',
                })}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
              {errors.password_confirm && (
                <p className="text-red-400">
                  {errors.password_confirm.message}
                </p>
              )}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  name="remember"
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="font-medium text-gray-900 dark:text-white"
                >
                  I accept the{' '}
                  <a
                    href="#"
                    className="text-primary-700 hover:underline dark:text-primary-500"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href={{
                  pathname: '/auth/login',
                }}
                className="text-primary-700 hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </Auth>
  );
}
