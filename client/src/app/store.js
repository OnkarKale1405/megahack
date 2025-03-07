import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import MarketSlice from "./MarketSlice"
import ProductsSlice from "./ProductsSlice"


const store = configureStore({
    reducer: {
        auth: AuthSlice,
        market: MarketSlice,
        product: ProductsSlice,
    }
});

export default store;