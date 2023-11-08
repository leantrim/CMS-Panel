import { configureStore } from '@reduxjs/toolkit';
import webDataReducer from './features/webDataSlice';
import appSettingsSlice from './features/appSettingsSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    webData: webDataReducer,
    appSettingsSlice: appSettingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
