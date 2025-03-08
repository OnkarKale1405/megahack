import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    marketplace: JSON.parse(localStorage.getItem('marketplace')) || [],
};

const MarketSlice = createSlice({
    name: 'marketplace',
    initialState,
    reducers: {
        setMarketplace: (state, action) => {
            state.marketplace = action.payload;
            localStorage.setItem('marketplace', JSON.stringify(action.payload));
        },
    },
});

export const { setMarketplace } = MarketSlice.actions;

// Selectors
export const getMarkets = state => state.market.marketplace;
export const selectMarketById = (state, id) =>
    state.market.marketplace.find(item => item._id === id);

export default MarketSlice.reducer;
