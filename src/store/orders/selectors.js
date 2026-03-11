import { createSelector } from '@reduxjs/toolkit';

const selectOrders = (state) => state.orders;

export const selectAllOrders = createSelector(
    [selectOrders],
    (orders) => orders.orders
);

export const selectSelectedOrder = createSelector(
    [selectOrders],
    (orders) => orders.selectedOrder
);

export const selectOrderById = (orderId) => createSelector(
    [selectAllOrders],
    (orders) => orders.find(order => order.id === orderId)
);

export const selectOrderOperationStatus = (orderId) => createSelector(
    [selectOrders],
    (orders) => orders.operationStatus[orderId] ?? null
);

export const selectOrdersError = createSelector(
    [selectOrders],
    (orders) => orders.error
);

export const selectOrdersLastUpdated = createSelector(
    [selectOrders],
    (orders) => orders.lastUpdated
);

export const selectHasOrderData = createSelector(
    [selectOrders],
    (orders) => orders.orders.length > 0 || orders.selectedOrder !== null
);

