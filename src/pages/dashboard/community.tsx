import { useRequiredAuth } from '@/context/RequiredAuth';
import DefaultLayout from '@/layouts/DefaultLayout';
import { useState } from 'react';
import Members from '@/pages/community/members';
import CommunityDashboard from '@/pages/community/dashboard';

export default function Community() {
  const auth = useRequiredAuth();
  const [currentPage, setCurrentPage] = useState('community');

  function handlePageChange(page: any) {
    setCurrentPage(page);
  }

  return (
    <DefaultLayout >
      <div className="nav">
        <nav>
          <button onClick={() => handlePageChange('community')}>Community </button>
          <button onClick={() => handlePageChange('members')} className="pl-5">Člani</button>
        </nav>
        <div className="remove-ml ">
          {currentPage === 'community' && <CommunityDashboard />}
          {currentPage === 'members' && <Members />}
        </div>
      </div>
    </DefaultLayout>
  );
}
