import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: JSON.parse(localStorage.getItem("products")) || [], // Load from localStorage
};


const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            localStorage.setItem("products", JSON.stringify(state.products)); // Save to localStorage
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
            localStorage.setItem("products", JSON.stringify(state.products));
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload);
            localStorage.setItem("products", JSON.stringify(state.products));
        },
        editProduct: (state, action) => {
            const { id, data } = action.payload;
            const index = state.products.findIndex(product => product._id === id);
            if (index !== -1) {
                state.products[index] = { ...state.products[index], ...data };
                localStorage.setItem("products", JSON.stringify(state.products));
            }
        },
        clearProduct: (state) => {
            state.products = [];
            localStorage.removeItem("products"); // Clear from localStorage
        }
    },
});


export const { setProducts, addProduct, removeProduct, editProduct } = ProductsSlice.actions;

// Selector to get product by ID
export const getProducts = (state) => state.products.products;
export const selectProductById = (state, id) =>
    state.products.products.filter(product => product._id === id);

export default ProductsSlice.reducer;
