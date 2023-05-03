import ChartHistoryProduction from '@/components/Charts/ChartHistoryProduction';
import DashboardSkeleton from '@/components/Skeletons/DashboardSkeleton';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import DefaultLayout from '@/layouts/DefaultLayout';

export default function History() {
  const { loading } = useAuthRequired();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <DefaultLayout>
      <div className="px-4 pt-6">
        <ChartHistoryProduction />
      </div>
    </DefaultLayout>
  );
}
