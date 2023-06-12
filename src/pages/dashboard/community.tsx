import { useAuthRequired } from '@/hooks/useAuthRequired';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useRef, useState } from 'react';
import CommunityMembers from '@/components/community/CommunityMembers';
import CommunityDashboard from '@/components/community/CommunityDashboard';
import Head from 'next/head';
import { Tabs, TabsRef } from 'flowbite-react';

export default function Community() {
    const auth = useAuthRequired();

    const [currentPage, setCurrentPage] = useState('community');
    const [activeTab, setActiveTab] = useState<number>(0);
    const tabsRef = useRef<TabsRef>(null);
    const props = { setActiveTab, tabsRef };

    function handlePageChange(page: any) {
        setCurrentPage(page);
    }

    return (
        <DefaultLayout>
            <Head>
                <title>Skupnosti - Watt4Cast</title>
            </Head>
            <div>
                <Tabs.Group
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
                        icon={() => <span className="material-symbols-outlined">dashboard</span>}
                        title="Pregled proizvodnje in napovedi"
                    >
                        <div className="px-5">{currentPage === 'community' && <CommunityDashboard />}</div>
                    </Tabs.Item>
                    <Tabs.Item
                        icon={() => <span className="material-symbols-outlined">account_circle</span>}
                        title="Upravljanje s skupnostmi"
                    >
                        <div className="px-5">{currentPage === 'members' && <CommunityMembers />}</div>
                    </Tabs.Item>
                </Tabs.Group>
            </div>
        </DefaultLayout>
    );
}
