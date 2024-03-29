import React from 'react';

interface Props {
    statSubtitle: string;
    statTitle: string;
    statArrow: 'up' | 'down';
    statPercent: string;
    // can be any of the text color utilities
    // from tailwindcss
    statPercentColor: string;
    statDescripiron: string;
    statIconName: string;
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: string;
}

export default function CardStats({
    statSubtitle,
    statTitle,
    statArrow,
    statPercent,
    statPercentColor,
    statDescripiron,
    statIconName,
    statIconColor,
}: Props) {
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg dark:bg-gray-800">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-slate-400 uppercase font-bold text-xs">{statSubtitle}</h5>
                            <span className="font-semibold text-xl text-slate-700 dark:text-white">{statTitle}</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div
                                className={
                                    'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
                                    statIconColor
                                }
                            >
                                <span className="material-symbols-rounded">{statIconName}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400 mt-4">
                        {statPercent != null ? (
                            <span className={statPercentColor + ' mr-2'}>
                                {statArrow === 'up' ? (
                                    <span className="material-symbols-rounded material-font-size-xs">arrow_upward</span>
                                ) : statArrow === 'down' ? (
                                    <span className="material-symbols-rounded material-font-size-xs">
                                        arrow_downward
                                    </span>
                                ) : (
                                    ''
                                )}{' '}
                                {statPercent}
                            </span>
                        ) : null}
                        <span className="whitespace-nowrap text-xs">{statDescripiron}</span>
                    </p>
                </div>
            </div>
        </>
    );
}

// EXAMPLE OF VALUES
// CardStats.defaultProps = {
//   statSubtitle: 'PROIZVODNJA',
//   statTitle: '350,8 MWh',
//   statArrow: 'up',
//   statPercent: '3,48%',
//   statPercentColor: 'text-emerald-500',
//   statDescripiron: 'Od včeraj',
//   statIconName: 'bar_chart',
//   statIconColor: 'bg-green-500',
// };
