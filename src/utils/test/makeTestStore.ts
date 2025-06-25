import { configureStore } from '@reduxjs/toolkit';
import testRootReducer, { type TestRootState } from './testRootReducer';

const makeTestStore = (preloadedState?: Partial<TestRootState>) =>
  configureStore({
    reducer: testRootReducer,
    preloadedState,
  });

export default makeTestStore;
