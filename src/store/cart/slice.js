import { createSlice } from '@reduxjs/toolkit';
import cartInitialState from '@/store/cart/state';

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        clearCart: (state) => {
            console.log('[cartSlice] clearCart - Clearing cart (session expired)');
            return cartInitialState;
        },

        hydrateCart: (state, action) => {
            return { ...state, ...action.payload, isLoading: false };
        },
    },
});

export const {
    clearCart,
    hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;