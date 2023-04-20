import { useRequiredAuth } from '@/context/RequiredAuth';
import DefaultLayout from '@/layouts/DefaultLayout';
import CardLineChart from '@/components/Cards/CardLineChart';
import BlockCard from '@/components/Cards/BlockCard';
import CalibrationModal from '@/components/Form/CalibrationModal';

export default function CommunityDashboard() {
  const auth = useRequiredAuth();
  return (
    <DefaultLayout>
      <div className="pt-10 text-center justify-center block bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-screen">
        <h1 className="pl-10 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Moja organizacija
          </span>{' '}
        </h1>
        <div className="flex pl-10">
          <div className="pr-12">
            <BlockCard subtitle={'Danes'} info={'15kw'}/>
          </div>
          <div className="pr-12">
            <BlockCard subtitle={'Jutri'} info={'22kw'} smallText={'Do zdaj: 14kW'}/>
          </div>
          <div className="pr-12">
            <BlockCard subtitle={'Pojutrišnjem'} info={'10kw'}/>
          </div>
          <div className="community-btns ml-auto mr-15">
            <CalibrationModal />
          </div>
        </div>
        <div className="pl-10 chart">
          <CardLineChart />
        </div>
      </div>
    </DefaultLayout>
  );
}
