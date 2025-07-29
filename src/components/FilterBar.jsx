import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPricing, resetFilters, setPriceRange } from '../store/filterSlice';
// const MAX_PRICE = 999;

const options = [
  { label: 'Paid', value: 0 },
  { label: 'Free', value: 1 },
  { label: 'View Only', value: 2 }
];

export default function FilterBar() {
  const dispatch = useDispatch();
  const pricing = useSelector((state) => state.filter.pricing);
  const priceRange = useSelector((state) => state.filter.priceRange || 0);


  const handleChange = (optionValue) => {
    let newPricing = pricing.includes(optionValue)
      ? pricing.filter((p) => p !== optionValue)
      : [...pricing, optionValue];
    dispatch(setPricing(newPricing));
  };

  const handlePriceSliderChange = (value) => {
    dispatch(setPriceRange(value));
  };


  return (
    <div className="filter-bar">
      <div>
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
      </div>
      {/* Price slider */}
      {/* <div className="price-slider-container">
        <span className="slider-label">$0</span>
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          value={priceRange}
          onChange={(e) => handlePriceSliderChange(e.target.value)}
          className="price-slider"
        />
        <span className="slider-value">${MAX_PRICE}</span>
      </div> */}
      <button className="reset-btn" onClick={() => dispatch(resetFilters())}>RESET</button>
    </div>
  );
} 