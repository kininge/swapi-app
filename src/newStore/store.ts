// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { persistStore } from 'redux-persist';
import { planetAPI } from '../features/planets/planetAPI';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist compatibility
    }).concat(planetAPI.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// ✅ Types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
