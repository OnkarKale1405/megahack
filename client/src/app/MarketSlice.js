import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    marketplace: [],
};

const MarketSlice = createSlice({
    name: 'marketplace',
    initialState,
    reducers: {
        setMarketplace: (state, action) => {
            state.marketplace = action.payload;
        },
    },
});

export const { setMarketplace } = MarketSlice.actions;

export const getMarkets = state =>  state.marketplace.marketplace;
export const selectMarketById = (state, id) =>
    state.marketplace.marketplace.find(item => item.id === id);

export default MarketSlice.reducer;