import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, Dropdown } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';

export default function Sidebar() {
  const router = useRouter();
  const auth = useAuth();

  return (
    <>
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full font-normal duration-75 lg:flex transition-width"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <Link href="/dashboard">
              <div className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
                <div className="flex items-center justify-center">
                  Watt
                  <Image src="/lightning.svg" alt="4" className="px-1 animate-pulse" width={30} height={30} />
                  Cast
                </div>
              </div>
            </Link>
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <ul className="pb-2 space-y-2">
                <li>
                  <Link
                    href="/dashboard"
                    className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                      router.pathname === '/dashboard' ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <span className="material-symbols-rounded w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                      monitoring
                    </span>
                    <span className="ml-3" sidebar-toggle-item="true">
                      Moja elektrarna
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/history"
                    className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                      router.pathname === '/dashboard/history' ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <span className="material-symbols-rounded w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                      history
                    </span>
                    <span className="ml-3" sidebar-toggle-item="true">
                      Moja zgodovina
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/community"
                    className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                      router.pathname === '/dashboard/community' ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <span className="material-symbols-rounded material-filled w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                      groups
                    </span>
                    <span className="ml-3" sidebar-toggle-item="true">
                      Moja skupnost
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/settings"
                    className={`flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                      router.pathname === '/dashboard/settings' ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <span className="material-symbols-rounded material-filled w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                      settings
                    </span>
                    <span className="ml-3" sidebar-toggle-item="true">
                      Nastavitve
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="absolute bottom-14 mb-3 left-0 justify-center hidden w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800">
            <button
              id="dropdownNotificationButton"
              data-dropdown-toggle="dropdownNotification"
              className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
              type="button"
              title="Obvestila"
            >
              <span className="material-symbols-rounded material-filled w-6 h-6">notifications</span>
              <div className="relative flex">
                <div className="relative inline-flex w-3 h-3 bg-yellow-300 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
              </div>
            </button>

            <ThemeSwitcher />

            <button
              onClick={() => auth.signout()}
              className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              title="Odjava"
            >
              <span className="material-symbols-rounded w-6 h-6">logout</span>
            </button>
          </div>

          <div className="absolute bottom-0 left-0 justify-center hidden w-full p-4 space-x-4 bg-white lg:flex dark:bg-gray-800">
            <Dropdown
              label={
                <Avatar
                  alt="Uporabniške nastavitve"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded={true}
                >
                  <div className="space-y-1 font-medium dark:text-white">
                    <div>{auth.user?.email}</div>
                  </div>
                </Avatar>
              }
              arrowIcon={false}
              inline={true}
            >
              <Dropdown.Header>
                <span className="block truncate text-sm font-medium">{auth.user?.email}</span>
              </Dropdown.Header>
              <Dropdown.Item>Obvestila</Dropdown.Item>
              <Dropdown.Item>
                <Link href="/dashboard/settings">Nastavitve</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => auth.signout()}>Odjava</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </aside>

      <div className="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90" id="sidebarBackdrop"></div>
    </>
  );
}
