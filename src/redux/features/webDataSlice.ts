import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactInfo, InfoType, Services, SiteProperty, WebsiteModel, generateInitialState } from 'types/WebsiteModel';

const initialState: WebsiteModel = generateInitialState();

const webDataSlice = createSlice({
  name: 'webData',
  initialState,
  reducers: {
    updateWebData: (
      state,
      action: PayloadAction<{
        key: keyof WebsiteModel;
        fieldKey: keyof SiteProperty | null;
        value: any;
        index?: number;
      }>,
    ) => {
      const { key, fieldKey, value, index } = action.payload;

      if (Array.isArray(state[key])) {
        state[key] = state[key].map((item: any, idx: number) =>
          index === idx ? (fieldKey ? { ...item, [fieldKey]: value } : value) : item,
        );
      } else {
        state[key] = fieldKey ? { ...state[key], [fieldKey]: value } : value;
      }
      return state;
    },
    addData: (state, action: PayloadAction<{ key: keyof WebsiteModel; data?: any }>) => {
      const { key, data } = action.payload;

      if (Array.isArray(state[key])) {
        return {
          ...state,
          [key]: [...(state[key] as any[]), data],
        };
      }
      return state;
    },
    deleteData: (state, action: PayloadAction<{ key: keyof WebsiteModel; index: number }>) => {
      const { key, index } = action.payload;

      state[key] = (state[key] as SiteProperty[]).filter((_: Services, i: number) => i !== index);

      return state;
    },
    setWebData: (state, action: PayloadAction<WebsiteModel>) => {
      return action.payload;
    },
  },
});

export const { updateWebData, setWebData, deleteData, addData } = webDataSlice.actions;

export default webDataSlice.reducer;
