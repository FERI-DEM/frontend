import React from 'react';

const ClockCard = ({ subtitle= '', info= '', smallText = ''  }) => {
  return (
    <div className="block-card-container">
        <h4 className="block-card-subtitle">{subtitle}</h4>
        <h2 className="block-card-info">{info}</h2>
        <p className="block-card-small-text">{smallText}</p>
    </div>
  )
}

export default ClockCard;