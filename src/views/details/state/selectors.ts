import { RootState } from 'store';

export const getDetails = (state: RootState) => state.details.repo;
