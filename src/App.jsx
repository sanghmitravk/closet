import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContents } from './store/contentSlice';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import ContentGrid from './components/ContentGrid';
import './App.css';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContents());
  }, [dispatch]);
  

  return (
    <div className="app-container">
        <SearchBar />
        <FilterBar />
        <ContentGrid />
    </div>
  );
}
