import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pricing: [],
  keyword: '',
  priceRange: 0, // Start at 0 (free content)
  sortBy: "relevance"
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPricing: (state, action) => {
      state.pricing = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.pricing = [];
      state.keyword = '';
      state.priceRange = 0; // Reset to free
      state.sortBy = 'relevance'; // Reset sorting too
    },
  },
});

export const { setPricing, setKeyword, resetFilters, setPriceRange, setSortBy } = filterSlice.actions;
export default filterSlice.reducer; 