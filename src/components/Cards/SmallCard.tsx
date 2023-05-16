import React from 'react';

const SmallCard = ({ time= '', info= '', smallText = ''  }) => {
  return (
    <div className="min-w-0 w-12 bg-white text-center block border-gray-200 rounded shadow-lg dark:bg-gray-800 dark:border-gray-900 p-1 ml-3">
      <p className="material-font-size-xs">{time}</p>
    </div>
  )
}

export default SmallCard;