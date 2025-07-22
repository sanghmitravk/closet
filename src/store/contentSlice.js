import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContents = createAsyncThunk(
  'content/fetchContents',
  async () => {
    const res = await fetch('https://closet-recruiting-api.azurewebsites.net/api/data');
    return res.json();
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contentSlice.reducer; 