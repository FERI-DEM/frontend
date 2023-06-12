import { useAuthRequired } from '@/hooks/useAuthRequired';
import DefaultLayout from '@/layouts/DefaultLayout';

export default function CommunityDashboard() {
  const auth = useAuthRequired();
  return (
    <DefaultLayout>
      <div className="pt-10 text-center justify-center block bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-screen">
        <h1 className="pl-10 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Moja organizacija
          </span>{' '}
        </h1>
        <div className="flex pl-10">
        </div>
        <div className="pl-10 chart">
          {/* <ChartLine /> */}
        </div>
      </div>
    </DefaultLayout>
  );
}
