'use client'

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrders } from '@/store/orders/slice';
import { selectHasOrderData } from '@/store/orders/selectors';

/**
 * Synchronizes Redux orders state with NextAuth session.
 * Clears orders from Redux when the user logs out or session expires.
 * Does NOT fetch orders (handled by server components via setOrders/setSelectedOrder).
 */
export function useOrdersSync() {
    const { status } = useSession();
    const dispatch = useDispatch();
    const hasOrderData = useSelector(selectHasOrderData);

    useEffect(() => {
        if (status === 'unauthenticated' && hasOrderData) {
            dispatch(clearOrders());
        }
    }, [status, hasOrderData, dispatch]);
}
