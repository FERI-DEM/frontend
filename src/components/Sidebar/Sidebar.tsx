import React from 'react';
import Link from 'next/link';
import { Avatar, Dropdown } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from '../Logo/Logo';
import { mutate } from 'swr';

export default function Sidebar() {
    const router = useRouter();
    const auth = useAuth();

    const clearCache = () => mutate(() => true, undefined, { revalidate: false });

    const handleLogout = async () => {
        clearCache();
        await auth.signout();
    };

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
                            <Logo />
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
                                            router.pathname === '/dashboard/history'
                                                ? 'bg-gray-100 dark:bg-gray-700'
                                                : ''
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
                                            router.pathname === '/dashboard/community'
                                                ? 'bg-gray-100 dark:bg-gray-700'
                                                : ''
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
                                            router.pathname === '/dashboard/settings'
                                                ? 'bg-gray-100 dark:bg-gray-700'
                                                : ''
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
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75 -top-2 right-3"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-300 -top-2 right-3 border-2 border-white dark:border-gray-900"></span>
                            </div>
                        </button>

                        <ThemeSwitcher />

                        <button
                            onClick={handleLogout}
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
                                    rounded={true}
                                    bordered={true}
                                    size="sm"
                                    alt="Uporabniške nastavitve"
                                    img={auth.user?.photoUrl}
                                    placeholderInitials={
                                        auth.user?.photoUrl ? null : auth.user?.email?.slice(0, 2)?.toUpperCase()
                                    }
                                >
                                    <div className="break-words space-y-1 font-medium dark:text-white">
                                        <div>{auth.user?.name ?? auth.user?.email}</div>
                                    </div>
                                </Avatar>
                            }
                            arrowIcon={false}
                            inline={true}
                        >
                            <Dropdown.Header>
                                <span className="block truncate text-base font-medium">{auth.user?.name}</span>
                                <span className="block truncate text-sm font-medium">{auth.user?.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item>Obvestila</Dropdown.Item>
                            <Dropdown.Item onClick={() => router.push('/dashboard/settings')}>Nastavitve</Dropdown.Item>
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
