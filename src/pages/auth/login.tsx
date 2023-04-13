import Auth from '@/layouts/Auth';
import Link from 'next/link';

export default function Login() {
  return (
    <Auth>
      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sign in to platform
        </h2>
        <form className="mt-8 space-y-6" action="#">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="name@mail.com"
              required
            />
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
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
          <div className="flex items-start">
            <button
              type="submit"
              className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <Link href={{ pathname: '/dashboard' }}>
                Login to your account
              </Link>
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
      </div>
    </Auth>
  );
}
