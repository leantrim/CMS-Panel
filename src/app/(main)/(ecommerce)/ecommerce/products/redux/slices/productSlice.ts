import { initialProductState, ProductType } from '@mediapartners/shared-types/types/ecommerce/ProductType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type appSettings = {
  editingBlock: string;
  product: ProductType;
};

const initialState: appSettings = {
  editingBlock: '',
  product: initialProductState,
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setEditingBlock: (state, action: PayloadAction<string>) => {
      state.editingBlock = action.payload;
    },
    setProduct: (state, action: PayloadAction<ProductType>) => {
      state.product = action.payload;
    },
  },
});

export const { setEditingBlock, setProduct } = productSlice.actions;

export default productSlice.reducer;
