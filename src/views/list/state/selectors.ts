import { RootState } from 'store';

export const getRepos = (state: RootState) => state.list.repos;

export const getFetchStatus = (state: RootState) => state.list.status;
