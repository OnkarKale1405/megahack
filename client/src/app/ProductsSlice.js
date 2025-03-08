import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            // console.log("Products: ", action.payload);
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
export const getProducts = (state) => state.product.products;
export const selectProductById = (state, id) =>
    state.product.products.find(product => product._id === id);

export default ProductsSlice.reducer;
