/**
 * Captures a snapshot of a specific order's data before optimistic mutations.
 * Used for per-order rollback if the server request fails.
 */
export const captureOrderSnapshot = (ordersState, orderId) => ({
    orderInList: ordersState.orders.find(o => o.id === orderId) ?? null,
    selectedOrder: ordersState.selectedOrder?.id === orderId 
        ? ordersState.selectedOrder 
        : null,
});

/**
 * Server response extractors.
 * Defensively handle various possible response shapes from the backend.
 * If extraction fails (returns null), the optimistic data stays — which
 * matches what the user submitted, so it's still correct.
 */
export const extractShippingInfo = (response) => {
    return response?.order?.shipping_info ?? response?.shipping_info ?? null;
};

export const extractDeliveryDate = (response) => {
    return response?.order?.delivery_date ?? response?.delivery_date ?? null;
};

export const extractOrderStatus = (response) => {
    return response?.order?.status ?? response?.status ?? null;
};

