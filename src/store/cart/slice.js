import { createSlice } from '@reduxjs/toolkit';
import cartInitialState from '@/store/cart/state';

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        clearCart: () => {
            return cartInitialState;
        },

        hydrateCart: (state, action) => {
            state.id = action.payload.id;
            state.items = action.payload.items || [];
            state.total = action.payload.total || 0;
            state.total_items = action.payload.total_items || 0;
            state.isLoading = false;
            state.error = null;
            state.lastUpdated = Date.now();
        },

        /**
         * Optimistically update an item's qty and recalculate cart totals.
         * Dispatched from useOptimisticCartItem on increment/decrement
         * so cart total and total_items update instantly in the UI.
         * Server reconciliation happens via hydrateCart after refetch.
         */
        optimisticUpdateItemQty: (state, action) => {
            const { productId, newQty } = action.payload;
            const item = state.items.find((i) => i.product_id === productId);

            if (!item) return;

            const oldQty = item.qty;
            const priceDiff = (newQty - oldQty) * (item.price_per_case ?? 0);

            item.qty = newQty;
            state.total = Math.max(0, state.total + priceDiff);
            state.total_items = Math.max(0, state.total_items + (newQty - oldQty));
        },

        /**
         * Optimistically remove an item from cart and recalculate totals.
         * Dispatched from useOptimisticCartItem on delete
         * so the item disappears from UI instantly.
         * Server reconciliation happens via hydrateCart after refetch.
         */
        optimisticRemoveItem: (state, action) => {
            const { productId } = action.payload;
            const itemIndex = state.items.findIndex((i) => i.product_id === productId);

            if (itemIndex === -1) return;

            const item = state.items[itemIndex];
            const itemTotal = item.qty * (item.price_per_case ?? 0);

            state.items.splice(itemIndex, 1);
            state.total = Math.max(0, state.total - itemTotal);
            state.total_items = Math.max(0, state.total_items - item.qty);
        },

        /**
         * Rollback a failed optimistic delete by re-inserting the item.
         * The hook stashes the full item object before dispatching optimisticRemoveItem,
         * then dispatches this if the server DELETE fails (e.g. 429).
         */
        rollbackRemoveItem: (state, action) => {
            const { item } = action.payload;
            if (!item) return;

            const exists = state.items.some((i) => i.product_id === item.product_id);
            if (exists) return;

            state.items.push(item);
            state.total += item.qty * (item.price_per_case ?? 0);
            state.total_items += item.qty;
        },
    },
});

export const {
    clearCart,
    hydrateCart,
    optimisticUpdateItemQty,
    optimisticRemoveItem,
    rollbackRemoveItem,
} = cartSlice.actions;

export default cartSlice.reducer;