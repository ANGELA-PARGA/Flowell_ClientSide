import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const normalizeCartResponse = (payload) => {
    const cartData = payload?.data?.cart ?? payload?.cart ?? payload;

    return {
        id: cartData?.id ?? null,
        items: cartData?.items ?? [],
        total: cartData?.total ?? 0,
        total_items: cartData?.total_items ?? 0,
    };
};

const rawBaseQuery = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
});

const normalizedBaseQuery = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (!result.error) {
        return result;
    }

    const statusCode = result.error?.status;
    const backendPayload = result.error?.data;

    if (statusCode === 401 || statusCode === 403) {
        return {
            error: {
                status: statusCode,
                data: {
                    code: 'SESSION_EXPIRED',
                    message: 'Session expired',
                    details: backendPayload,
                },
            },
        };
    }

    const fallbackMessage =
        backendPayload?.error ??
        backendPayload?.message ??
        'Unexpected cart request error';

    return {
        error: {
            status: statusCode,
            data: {
                code: 'CART_REQUEST_FAILED',
                message: fallbackMessage,
                details: backendPayload,
            },
        },
    };
};

const baseQueryWithRetry = retry(normalizedBaseQuery, { maxRetries: 1 });

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => ({
                url: '/cart',
                method: 'GET',
            }),
            providesTags: ['Cart'],
            transformResponse: normalizeCartResponse,
        }),

        updateCartItem: builder.mutation({
            query: ({ product_id, qty }) => ({
                url: '/cart',
                method: 'PATCH',
                body: { product_id, qty },
            }),
            invalidatesTags: ['Cart'],
            transformResponse: normalizeCartResponse,
        }),

        deleteCartItem: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
            transformResponse: normalizeCartResponse,
        }),

        addProductToCart: builder.mutation({
            query: ({ product_id, qty }) => ({
                url: '/cart/products',
                method: 'POST',
                body: { product_id, qty },
            }),
            invalidatesTags: ['Cart'],
            transformResponse: normalizeCartResponse,
        }),
    }),
});

export const {
    useGetCartQuery,
    useUpdateCartItemMutation,
    useDeleteCartItemMutation,
    useAddProductToCartMutation,
} = cartApi;
