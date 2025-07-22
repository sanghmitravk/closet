import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPricing, resetFilters } from '../store/filterSlice';

const options = [
  { label: 'Paid', value: 0 },
  { label: 'Free', value: 1 },
  { label: 'View Only', value: 2 }
];

export default function FilterBar() {
  const dispatch = useDispatch();
  const pricing = useSelector((state) => state.filter.pricing);
  // For now, slider is UI only; add state management as needed
  const [price, setPrice] = React.useState([0, 999]);
  const paidChecked = pricing.includes(0);

  const handleChange = (optionValue) => {
    let newPricing = pricing.includes(optionValue)
      ? pricing.filter((p) => p !== optionValue)
      : [...pricing, optionValue];
    dispatch(setPricing(newPricing));
  };

  return (
    <div className="filter-bar">
      <span>Pricing Option:</span>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="checkbox"
            checked={pricing.includes(option.value)}
            onChange={() => handleChange(option.value)}
          />
          {option.label}
        </label>
      ))}
      {/* Price slider */}
      <div className="price-slider-container">
        <span className="slider-label">$0</span>
        <input
          type="range"
          min={0}
          max={999}
          value={price[0]}
          disabled={!paidChecked}
          onChange={e => setPrice([+e.target.value, price[1]])}
          className="price-slider"
        />
        <input
          type="range"
          min={0}
          max={999}
          value={price[1]}
          disabled={!paidChecked}
          onChange={e => setPrice([price[0], +e.target.value])}
          className="price-slider"
        />
        <span className="slider-label">${price[1] === 999 ? '999+' : price[1]}</span>
      </div>
      <button className="reset-btn" onClick={() => dispatch(resetFilters())}>RESET</button>
    </div>
  );
} 