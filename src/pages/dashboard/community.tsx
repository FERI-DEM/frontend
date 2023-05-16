import { useAuthRequired } from '@/hooks/useAuthRequired';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useState } from 'react';
import Members from '@/pages/community/members';
import CommunityDashboard from '@/pages/community/dashboard';

export default function Community() {
  const auth = useAuthRequired();
  const [currentPage, setCurrentPage] = useState('community');

  function handlePageChange(page: any) {
    setCurrentPage(page);
  }

  return (
    <DefaultLayout >
      <div className="nav  dark:bg-gray-900">
        <nav className="pl-10 pt-9">
          <button onClick={() => handlePageChange('community')} className=" text-slate-700 dark:text-white">Organizacija</button>
          <button onClick={() => handlePageChange('members')} className="pl-5  text-slate-700 dark:text-white">Člani</button>
        </nav>
        <div className="remove-ml pt-0 mt-0 dark:bg-gray-900">
          {currentPage === 'community' && <CommunityDashboard />}
          {currentPage === 'members' && <Members />}
        </div>
      </div>
    </DefaultLayout>
  );
}
