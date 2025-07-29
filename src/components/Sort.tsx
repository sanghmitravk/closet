import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../store/filterSlice';

export const Sort = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: { filter: { sortBy: string } }) => state.filter.sortBy);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div className="sorting-container">
      <span className="sorting-label">Sort by</span>
      <select
        className="sorting-dropdown"
        value={sortBy}
        onChange={handleSortChange}
      >
        <option value="relevance">Relevance</option>
        <option value="name">Item Name</option>
        <option value="high">Higher Price</option>
        <option value="low">Lower Price</option>
      </select>
    </div>
  );
};
