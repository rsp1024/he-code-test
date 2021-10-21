import { createSlice } from '@reduxjs/toolkit';

// Types
export type DetailsState = any; // TODO: type Repo

const initialState: DetailsState = { repo: {} };

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setDetails(state, action) {
      state.repo = action.payload;
    },
  },
});

export const { setDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;
