import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword } from '../store/filterSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.filter.keyword);

  return (
    <input
      type="text"
      placeholder="Find the items you’re looking for"
      value={keyword}
      onChange={(e) => dispatch(setKeyword(e.target.value))}
      className="search-bar"
    />
  );
} 