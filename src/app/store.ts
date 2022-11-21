import { configureStore } from '@reduxjs/toolkit';

import treeReducer from '../features/treeSlice';

export const store = configureStore({
  reducer: {
    tree: treeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
