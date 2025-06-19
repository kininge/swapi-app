import { configureStore } from '@reduxjs/toolkit';
import { characterAPI } from '../services/characterApi';

export const store = configureStore({
  reducer: { [characterAPI.reducerPath]: characterAPI.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterAPI.middleware),
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
