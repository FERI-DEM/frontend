import { useAuthRequired } from '@/hooks/useAuthRequired';
import DefaultLayout from '@/layouts/DefaultLayout';
import ChartLine from '@/components/Charts/ChartLine';
import BlockCard from '@/components/Cards/BlockCard';
import CalibrationModal from '@/components/Form/CalibrationModal';
import SmallCard from "@/components/Cards/SmallCard";
import NotificationCard from "@/components/Cards/NotificationCard";

export default function CommunityDashboard() {
  const auth = useAuthRequired();
  return (
    <DefaultLayout>
      <div className="pt-10 text-center justify-center block bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 h-screen">
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
          <div className="community-btns">
            <CalibrationModal />
          </div>
        </div>
        <div className="pl-10 chart">
           {/*<ChartLine />*/}
        </div>
        <div className="flex ml-7">
          <SmallCard time="15min"></SmallCard>
          <SmallCard time="30min"></SmallCard>
          <SmallCard time="1h"></SmallCard>
          <SmallCard time="3h"></SmallCard>
        </div>
        <div>
          <NotificationCard notification="Padec energije cez 1h" statIconColor="bg-yellow-300" statIconName="info"></NotificationCard>
        </div>
      </div>
    </DefaultLayout>
  );
}
