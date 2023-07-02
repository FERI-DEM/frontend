import { DateType } from '@/types/common.types';
import moment from 'moment';

interface Props {
    title: string;
    value: string;
    dateRange?: { label: string; range: { from: Date; to: Date }; type: DateType } | undefined;
}

export default function CardStatsBasic({ title, value, dateRange }: Props) {
    return (
        <>
            <div className="px-4 py-1 border-l-2">
                <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-slate-400 uppercase font-light text-xs">
                            {title}: <br />
                            {dateRange &&
                                `${moment(dateRange.range.from).format('DD.MM.YYYY')} - ${moment(
                                    dateRange.range.to
                                ).format('DD.MM.YYYY')}`}
                        </h5>
                        <span className="font-semibold text-xl text-slate-700 dark:text-white">{value}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
