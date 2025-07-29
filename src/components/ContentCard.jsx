import React from 'react';
export default function ContentCard({ item }) {
  return (
    <div className={"content-card"}>
      <img src={item?.imagePath} alt={item?.title} height={100} />
      <div className="content-info">
        <div className="content-info-content">
          <div>{item.creator}</div>
          <div>{item.title}</div>
        </div>
        <div className="content-info-price">
          {item?.pricingOption === 0
            ? `$${item.price.toFixed(2)}`
            : item?.pricingOption === 1
            ? 'FREE'
            : 'View Only'}
        </div>
      </div>
    </div>
  );
} 