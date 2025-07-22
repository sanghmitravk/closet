import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './contentSlice';
import filterReducer from './filterSlice';

export default configureStore({
  reducer: {
    content: contentReducer,
    filter: filterReducer,
  },
}); 