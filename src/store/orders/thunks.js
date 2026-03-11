import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
    updateOrderShippingInfo, 
    updateOrderDeliverydateInfo, 
    cancelOrder, 
} from "@/actions/ordersRequest";
import { 
    updateOrderShippingLocally,
    updateOrderDateLocally,
    cancelOrderLocally,
    restoreOrder,
    clearOrders,
} from './slice';
import { captureOrderSnapshot } from './utilities';

/**
 * Updates shipping information on a specific order.
 * Implements optimistic updates with per-order rollback.
 */
export const updateOrderShipping = createAsyncThunk(
    'orders/updateOrderShipping',
    async ({ orderId, data }, { rejectWithValue, dispatch, getState }) => {
        const snapshot = captureOrderSnapshot(getState().orders, orderId);

        dispatch(updateOrderShippingLocally({ orderId, data }));

        try {
            const response = await updateOrderShippingInfo(data, orderId);

            if (response?.expired) {
                dispatch(clearOrders());
                return rejectWithValue('Session expired');
            }

            return { orderId, serverData: response };
        } catch (error) {
            dispatch(restoreOrder({ orderId, snapshot }));
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Updates delivery date on a specific order.
 * Implements optimistic updates with per-order rollback.
 */
export const updateOrderDeliveryDate = createAsyncThunk(
    'orders/updateOrderDeliveryDate',
    async ({ orderId, data }, { rejectWithValue, dispatch, getState }) => {
        const snapshot = captureOrderSnapshot(getState().orders, orderId);

        dispatch(updateOrderDateLocally({ orderId, data }));

        try {
            const response = await updateOrderDeliverydateInfo(data, orderId);

            if (response?.expired) {
                dispatch(clearOrders());
                return rejectWithValue('Session expired');
            }

            return { orderId, serverData: response };
        } catch (error) {
            dispatch(restoreOrder({ orderId, snapshot }));
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Cancels a specific order.
 * Implements optimistic updates with per-order rollback.
 */
export const cancelOrderThunk = createAsyncThunk(
    'orders/cancelOrder',
    async ({ orderId }, { rejectWithValue, dispatch, getState }) => {
        const snapshot = captureOrderSnapshot(getState().orders, orderId);

        dispatch(cancelOrderLocally({ orderId }));

        try {
            const response = await cancelOrder(orderId);

            if (response?.expired) {
                dispatch(clearOrders());
                return rejectWithValue('Session expired');
            }

            return { orderId, serverData: response };
        } catch (error) {
            dispatch(restoreOrder({ orderId, snapshot }));
            return rejectWithValue(error.message);
        }
    }
);
