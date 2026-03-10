'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { clearCart, hydrateCart } from '@/store/cart/slice';
import { useGetCartQuery } from '@/store/cart/cartApi';

/**
 * useCartSync - Custom hook to synchronize Redux cart state with authentication
 * 
 * Responsibilities:
 * - Fetches cart from server when user logs in
 * - Clears cart when user logs out
 * - Validates cart with server on page refresh (if authenticated)
 * - Optimized to prevent race conditions and unnecessary re-renders
 * 
 * Usage:
 * Typically used in a root-level client component wrapper.
 * 
 * Flow:
 * 1. On mount: If session exists → fetch cart from API
 * 2. On login: Session appears → fetch cart
 * 3. On logout: Session becomes null → clear cart
 * 4. On session expiry: Session becomes null → clear cart
 */
export function useCartSync() {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();

    const userId = session?.user?.id;

    const { data: cartData, error } = useGetCartQuery(undefined, {
        skip: status !== 'authenticated' || !userId,
        refetchOnReconnect: true,
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            console.log('[useCartSync] Clearing cart - user unauthenticated');
            dispatch(clearCart());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (!cartData || status !== 'authenticated') return;

        dispatch(hydrateCart(cartData));
    }, [cartData, status, dispatch]);

    useEffect(() => {
        const statusCode = error?.status;

        if (statusCode === 401 || statusCode === 403) {
            dispatch(clearCart());
        }
    }, [error, dispatch]);
}
