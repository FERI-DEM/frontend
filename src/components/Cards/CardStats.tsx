import React from 'react';
import PropTypes from 'prop-types';

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
}: any) {
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
            <span className={statPercentColor + ' mr-2'}>
              {statArrow === 'up' ? (
                <span className="material-symbols-rounded material-font-size">arrow_upward</span>
              ) : statArrow === 'down' ? (
                <span className="material-symbols-rounded material-font-size">arrow_downward</span>
              ) : (
                ''
              )}{' '}
              {statPercent}
            </span>
            <span className="whitespace-nowrap text-xs">{statDescripiron}</span>
          </p>
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statSubtitle: 'Proizvodnja',
  statTitle: '350,8 MWh',
  statIconName: 'bar_chart',
  statIconColor: 'bg-green-500',
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(['up', 'down']),
  statPercent: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: PropTypes.string,
};
