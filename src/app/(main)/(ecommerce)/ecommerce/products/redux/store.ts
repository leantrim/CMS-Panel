import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import productSlice from './slices/productSlice';

export const store = configureStore({
  reducer: {
    productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useProductSelector: TypedUseSelectorHook<RootState> = useSelector;
