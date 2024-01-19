import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

/* 
fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then((payload: IProductResponse) => {
        dispatch({type: FETCH_TO_PRODUCT, payload});
      })
      .catch(error => console.error('Fetch Error!', error));
*/

export const fetchProduct = createAsyncThunk('fetchProduct', async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response?.json()
    return data;
});

export const producttSlice = createSlice({
  name: 'product',
  initialState: {products: [], loading: false, errorMessage: '', count: 0},
  reducers: {
    setCount : (state, action) => {
      state.count = action.payload;
    },
    clearAllProduct: state => {
      state.products = [];
      state.count = 0;
    }
  },
  extraReducers: builder => {
    builder 
    .addCase(fetchProduct.pending, state => {
        state.loading = true;
        state.errorMessage = '';
    })
    .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.products = []
        state.errorMessage = action.error.message || '';
    })
    .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.count = action.payload.length;
    })
      
  },
});

export const  {setCount,clearAllProduct} = producttSlice.actions;

export default producttSlice.reducer;