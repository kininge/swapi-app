import { configureStore } from '@reduxjs/toolkit';
import { characterAPI } from '../services/characterApi';

export const setupStore = () =>
  configureStore({
    reducer: { [characterAPI.reducerPath]: characterAPI.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterAPI.middleware),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
