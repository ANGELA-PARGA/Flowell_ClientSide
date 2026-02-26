import { createSelector } from '@reduxjs/toolkit';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.items
);

export const selectCartTotal = createSelector(
    [selectCart],
    (cart) => cart.total
);

export const selectCartTotalItems = createSelector(
    [selectCart],
    (cart) => cart.total_items
);

export const selectCartIsLoading = createSelector(
    [selectCart],
    (cart) => cart.isLoading
);

export const selectProductQtyInCart = (state, productId) => {
    const item = state.cart.items.find(item => item.product_id === productId);
    return item ? item.qty : 0;
};

export const selectIsCartEmpty = createSelector(
    [selectCartTotalItems],
    (totalItems) => totalItems === 0
);