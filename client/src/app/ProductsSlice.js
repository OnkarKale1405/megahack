import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        editProduct: (state, action) => {
            const { id, data } = action.payload;
            const index = state.products.findIndex(product => product.id === id);
            if (index !== -1) {
                state.products[index] = { ...state.products[index], ...data };
            }
        },
        clearProduct: (state) => {
            state.products = [];
        }
    },
});

export const { setProducts, addProduct, removeProduct, editProduct } = ProductsSlice.actions;

// Selector to get product by ID
export const selectProductById = (state, id) =>
    state.products.products.find(product => product.id === id);

export default ProductsSlice.reducer;
