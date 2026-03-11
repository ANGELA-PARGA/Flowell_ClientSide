import { createSlice } from '@reduxjs/toolkit';
import ordersInitialState from './state';
import { updateOrderShipping, updateOrderDeliveryDate, cancelOrderThunk } from './thunks';
import { extractShippingInfo, extractDeliveryDate, extractOrderStatus } from './utilities';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: ordersInitialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
            state.lastUpdated = Date.now();
        },
        setSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload;
            state.lastUpdated = Date.now();
        },
        clearOrders: () => ordersInitialState,

        updateOrderShippingLocally: (state, action) => {
            const { orderId, data } = action.payload;

            if (state.selectedOrder?.id === orderId) {
                state.selectedOrder.shipping_info = {
                    ...state.selectedOrder.shipping_info,
                    ...data,
                };
            }

            state.operationStatus[orderId] = { type: 'updating', error: null };
            state.lastUpdated = Date.now();
        },

        updateOrderDateLocally: (state, action) => {
            const { orderId, data } = action.payload;

            if (state.selectedOrder?.id === orderId) {
                state.selectedOrder.delivery_date = data.delivery_date;
            }

            const orderInList = state.orders.find(o => o.id === orderId);
            if (orderInList) {
                orderInList.delivery_date = data.delivery_date;
            }

            state.operationStatus[orderId] = { type: 'updating', error: null };
            state.lastUpdated = Date.now();
        },

        cancelOrderLocally: (state, action) => {
            const { orderId } = action.payload;

            if (state.selectedOrder?.id === orderId) {
                state.selectedOrder.status = 'CANCELLED';
            }

            const orderInList = state.orders.find(o => o.id === orderId);
            if (orderInList) {
                orderInList.status = 'CANCELLED';
            }

            state.operationStatus[orderId] = { type: 'cancelling', error: null };
            state.lastUpdated = Date.now();
        },

        restoreOrder: (state, action) => {
            const { orderId, snapshot } = action.payload;

            if (snapshot.selectedOrder && state.selectedOrder?.id === orderId) {
                state.selectedOrder = snapshot.selectedOrder;
            }

            if (snapshot.orderInList) {
                const index = state.orders.findIndex(o => o.id === orderId);
                if (index !== -1) {
                    state.orders[index] = snapshot.orderInList;
                }
            }

            delete state.operationStatus[orderId];
            state.lastUpdated = Date.now();
        },

        clearOperationStatus: (state, action) => {
            const { orderId } = action.payload;
            delete state.operationStatus[orderId];
        },
    },
    extraReducers: (builder) => {
        builder
        // --- Update Shipping ---
        .addCase(updateOrderShipping.fulfilled, (state, action) => {
            const { orderId, serverData } = action.payload;
            const shippingInfo = extractShippingInfo(serverData);

            if (state.selectedOrder?.id === orderId && shippingInfo) {
                state.selectedOrder.shipping_info = shippingInfo;
            }

            delete state.operationStatus[orderId];
            state.lastUpdated = Date.now();
        })
        .addCase(updateOrderShipping.rejected, (state, action) => {
            const { orderId } = action.meta.arg;
            state.operationStatus[orderId] = { type: 'error', error: action.payload };
        })
        // --- Update Delivery Date ---
        .addCase(updateOrderDeliveryDate.fulfilled, (state, action) => {
            const { orderId, serverData } = action.payload;
            const deliveryDate = extractDeliveryDate(serverData);

            if (state.selectedOrder?.id === orderId && deliveryDate) {
                state.selectedOrder.delivery_date = deliveryDate;
            }

            const orderInList = state.orders.find(o => o.id === orderId);
            if (orderInList && deliveryDate) {
                orderInList.delivery_date = deliveryDate;
            }

            delete state.operationStatus[orderId];
            state.lastUpdated = Date.now();
        })
        .addCase(updateOrderDeliveryDate.rejected, (state, action) => {
            const { orderId } = action.meta.arg;
            state.operationStatus[orderId] = { type: 'error', error: action.payload };
        })
        // --- Cancel Order ---
        .addCase(cancelOrderThunk.fulfilled, (state, action) => {
            const { orderId, serverData } = action.payload;
            const status = extractOrderStatus(serverData) ?? 'CANCELLED';

            if (state.selectedOrder?.id === orderId) {
                state.selectedOrder.status = status;
            }

            const orderInList = state.orders.find(o => o.id === orderId);
            if (orderInList) {
                orderInList.status = status;
            }

            delete state.operationStatus[orderId];
            state.lastUpdated = Date.now();
        })
        .addCase(cancelOrderThunk.rejected, (state, action) => {
            const { orderId } = action.meta.arg;
            state.operationStatus[orderId] = { type: 'error', error: action.payload };
        });
    },
});

export const {
    setOrders,
    setSelectedOrder,
    clearOrders,
    updateOrderShippingLocally,
    updateOrderDateLocally,
    cancelOrderLocally,
    restoreOrder,
    clearOperationStatus,
} = ordersSlice.actions;

export default ordersSlice.reducer;
