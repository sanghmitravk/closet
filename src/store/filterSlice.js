import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pricing: [],
  keyword: '',
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
    resetFilters: (state) => {
      state.pricing = [];
      state.keyword = '';
    },
  },
});

export const { setPricing, setKeyword, resetFilters } = filterSlice.actions;
export default filterSlice.reducer; 