import CardLineChart from '@/components/Cards/CardLineChart';
import { useRequiredAuth } from '@/context/RequiredAuth';
import DefaultLayout from '@/layouts/DefaultLayout';

export default function Index() {
  const auth = useRequiredAuth();

  return (
    <DefaultLayout>
      <div className="px-4 pt-6">
        <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          {/* <!-- Main widget --> */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold leading-none text-gray-900 sm:text-2xl dark:text-white">
                  100 kWh
                </span>
                <h3 className="text-base font-light text-gray-500 dark:text-gray-400">
                  Production this week
                </h3>
              </div>
              <div className="flex items-center justify-end flex-1 text-base font-medium text-green-500 dark:text-green-400">
                12.5%
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <CardLineChart />
            <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
              <div>
                <button
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  type="button"
                  data-dropdown-toggle="weekly-sales-dropdown"
                >
                  Last 7 days{' '}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="weekly-sales-dropdown"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-white"
                      role="none"
                    >
                      Sep 16, 2021 - Sep 22, 2021
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Yesterday
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Today
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Last 7 days
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Last 30 days
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Last 90 days
                      </a>
                    </li>
                  </ul>
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Custom...
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="#"
                  className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
                >
                  Production Report
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
