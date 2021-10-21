import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Types
type Repo = any; // TODO: type Repo

export type ListState = {
  total_count: number;
  incomplete_results: boolean;
  repos: Repo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: Error | null;
};

type FetchReposArgs = {
  q: string;
  sortBy?: string;
};

// Async Thunk that call `search/repositories`
export const fetchRepos = createAsyncThunk(
  'list/fetchRepos',
  async ({ q, sortBy }: FetchReposArgs) => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${q}&sort=${sortBy}`
    );

    // TODO: camelize response?
    return response.json();
  }
);

const initialState: ListState = {
  total_count: 0,
  incomplete_results: false,
  repos: [],
  status: 'idle',
  error: null,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRepos.pending, (state, action: any) => {
      state.status = 'loading';
      state.repos = [];
    });

    builder.addCase(fetchRepos.fulfilled, (state, action: any) => {
      const { total_count, incomplete_results, items } = action.payload;

      state.status = 'succeeded';
      state.total_count = total_count;
      state.incomplete_results = incomplete_results;
      state.repos.push(...items);
    });

    builder.addCase(fetchRepos.rejected, (state, action: any) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const listReducer = listSlice.reducer;
