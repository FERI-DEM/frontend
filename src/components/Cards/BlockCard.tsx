import React from 'react';

const BlockCard = ({ subtitle= '', info= '', smallText = ''  }) => {
  return (
    <div className="min-w-0 w-20 bg-white align-center justify-center h-20 block border-gray-200 rounded mb-6 shadow-lg dark:bg-gray-800 dark:border-gray-900">
        <p className="block-card-subtitle">{subtitle}</p>
        <p className="block-card-info">{info}</p>
        <p className="block-card-small-text">{smallText}</p>
    </div>
  )
}

export default BlockCard;