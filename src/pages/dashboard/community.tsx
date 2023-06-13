import { useAuthRequired } from '@/hooks/useAuthRequired';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useRef, useState } from 'react';
import CommunityMembers from '@/components/community/CommunityMembers';
import CommunityDashboard from '@/components/community/CommunityDashboard';
import Head from 'next/head';
import { Tabs, TabsRef } from 'flowbite-react';
import CommunityCreateEdit from '@/components/community/CommunityCreateEdit';
import useCommunities from '@/hooks/useCommunities';
import useCommunityMembers from '@/hooks/useCommunityMembers';

export default function Community() {
    const auth = useAuthRequired();

    const { communities, communitiesError, communitiesLoading } = useCommunities();
    const { communityMembers, communityMembersError, communityMembersLoading } = useCommunityMembers(
        [(communities ?? [])?.map((x) => x.membersIds)?.flat()]?.flat()
    );

    const [currentPage, setCurrentPage] = useState('community');
    const [activeTab, setActiveTab] = useState<number>(0);
    const tabsRef = useRef<TabsRef>(null);
    const props = { setActiveTab, tabsRef };

    const [quickActionMenu, setQuickActionMenu] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<string | undefined>();

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    return (
        <DefaultLayout>
            <Head>
                <title>Skupnosti - Watt4Cast</title>
            </Head>
            <div>
                <Tabs.Group
                    theme={{
                        tablist: {
                            tabitem: {
                                styles: {
                                    underline: {
                                        active: {
                                            on: 'p-4 text-amber-600 border-b-2 border-amber-600 rounded-t-lg dark:text-amber-300 dark:border-amber-300',
                                        },
                                    },
                                },
                            },
                        },
                    }}
                    style="underline"
                    ref={props.tabsRef}
                    onActiveTabChange={(tab) => {
                        switch (tab) {
                            case 0:
                                handlePageChange('community');
                                break;
                            case 1:
                                handlePageChange('members');
                                break;
                            default:
                                handlePageChange('community');
                                break;
                        }
                        return props.setActiveTab(tab);
                    }}
                >
                    <Tabs.Item
                        active
                        icon={() => <span className="material-symbols-rounded">dashboard</span>}
                        title="Pregled proizvodnje in napovedi"
                    >
                        <div className="px-5">{currentPage === 'community' && <CommunityDashboard />}</div>
                    </Tabs.Item>
                    <Tabs.Item
                        icon={() => <span className="material-symbols-rounded">account_circle</span>}
                        title="Upravljanje s skupnostmi"
                    >
                        <div className="px-5">
                            {currentPage === 'members' && (
                                <CommunityMembers communities={communities} communityMembers={communityMembers} />
                            )}
                        </div>
                    </Tabs.Item>
                </Tabs.Group>
            </div>

            <div className="fixed right-10 bottom-10 group" onMouseLeave={() => setQuickActionMenu(false)}>
                <div
                    id="speed-dial-menu-text-outside-button-square"
                    className={`flex flex-col items-center mb-4 space-y-2 ${quickActionMenu ? '' : 'hidden'}`}
                >
                    <button
                        type="button"
                        className="relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
                    >
                        <span className="material-symbols-rounded mx-auto mt-1">send</span>
                        <span className="absolute block mb-px text-sm font-medium -translate-y-1/2 -left-36 top-1/2">
                            Povabi novega člana
                        </span>
                    </button>
                    <button
                        type="button"
                        className="relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
                    >
                        <span className="material-symbols-rounded mx-auto mt-1">visibility</span>
                        <span className="absolute block mb-px text-sm font-medium -translate-y-1/2 -left-40 top-1/2">
                            Prikaži člane skupnosti
                        </span>
                    </button>
                    <button
                        type="button"
                        className="relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
                    >
                        <span className="material-symbols-rounded mx-auto mt-1">edit</span>
                        <span className="absolute block mb-px text-sm font-medium -translate-y-1/2 -left-28 top-1/2">
                            Uredi skupnost
                        </span>
                    </button>
                    <button
                        type="button"
                        className="relative w-[52px] h-[52px] text-gray-500 bg-white rounded-full border border-gray-200 dark:border-gray-600 hover:text-gray-900 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
                        onClick={() => setOpenModal('form-elements')}
                    >
                        <span className="material-symbols-rounded mx-auto mt-1">add</span>
                        <span className="absolute block mb-px text-sm font-medium -translate-y-1/2 -left-40 top-1/2">
                            Ustvari novo skupnost
                        </span>
                    </button>
                </div>
                <button
                    type="button"
                    data-dial-toggle="speed-dial-menu-default"
                    aria-controls="speed-dial-menu-default"
                    aria-expanded="false"
                    className="flex items-center justify-center text-white bg-amber-700 rounded-full w-14 h-14 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 focus:ring-4 focus:ring-amber-300 focus:outline-none dark:focus:ring-amber-800"
                    onMouseEnter={() => setQuickActionMenu(true)}
                >
                    <span className="material-symbols-rounded transition-transform group-hover:rotate-45">add</span>
                    <span className="sr-only">Odpri akcijski meni</span>
                </button>
            </div>

            <div>
                <CommunityCreateEdit openModal={openModal} setOpenModal={setOpenModal} />
            </div>
        </DefaultLayout>
    );
}
