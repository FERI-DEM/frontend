import React from 'react';

const SmallCard = ({ notification= '', statIconColor= '', statIconName = ''  }) => {
  return (
    <div className="min-w-0 w-48 flex bg-white text-center border-gray-200 rounded shadow-lg dark:bg-gray-800 dark:border-gray-900 ml-10 mt-5 p-5">
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white">Obvestilo</h3>
        <p className="material-font-size-xs">{notification}</p>
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
  )
}

export default SmallCard;