import ChartLine from '../Charts/ChartLine';
import { addMissingDates } from '../Charts/utils/data-aggregation';
import ChartSkeleton from '../Skeletons/ChartSkeleton';
import { DateType } from '@/types/common.types';

interface Props {
    actualProduction: { x: Date; y: any }[];
    predictions: { x: Date; y: any }[];
    dateRange: { label: string; range: { from: Date; to: Date }; type: DateType };
    loading?: boolean;
}

export default function CommunityChart({ actualProduction, predictions, dateRange, loading }: Props) {
    return (
        <>
            {(!loading && (
                <ChartLine
                    dataset={[
                        {
                            name: 'Proizvodnja',
                            data: [...(addMissingDates(actualProduction, predictions) ?? [])],
                            color: '#1A56DB',
                            type: 'area',
                        },
                        {
                            name: 'Napoved proizvodnje',
                            data: [...(addMissingDates(predictions, actualProduction) ?? [])],
                            color: '#FDBA8C',
                            type: 'area',
                        },
                    ]}
                    displayRange={{
                        min: dateRange?.range?.from?.getTime(),
                        max: dateRange?.range?.to?.getTime(),
                    }}
                    isDashboard={false}
                    isEnabledAnimation={false}
                />
            )) || <ChartSkeleton />}
        </>
    );
}
