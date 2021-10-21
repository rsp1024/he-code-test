import { configureStore } from '@reduxjs/toolkit';

import { listReducer, ListState } from 'views/list/state/listSlice';
import { detailsReducer, DetailsState } from 'views/details/state/detailsSlice';

export type RootState = {
  list: ListState;
  details: DetailsState;
};

export const store = configureStore({
  reducer: {
    list: listReducer,
    details: detailsReducer,
  },
});
