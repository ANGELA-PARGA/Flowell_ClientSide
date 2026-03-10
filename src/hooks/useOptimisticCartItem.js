'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { 
    useDeleteCartItemMutation, 
    useUpdateCartItemMutation 
} from '@/store/cart/cartApi';
import {
    optimisticUpdateItemQty,
    optimisticRemoveItem,
    rollbackRemoveItem,
} from '@/store/cart/slice';

const getErrorStatus = (error) => error?.status ?? error?.originalStatus ?? null;
const getErrorCode = (error) => error?.data?.code ?? null;
const getErrorMessage = (error) => error?.data?.message ?? null;

export function useOptimisticCartItem({ item, productId, onSessionExpired, onRequestError }) {
    const dispatch = useDispatch();
    const [localQty, setLocalQty] = useState(item?.qty ?? 0);
    const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
    const [deleteCartItem, { isLoading: isDeleting }] = useDeleteCartItemMutation();

    const qtyRef = useRef(item?.qty ?? 0);
    const lastConfirmedQty = useRef(item?.qty ?? 0);
    const isInteracting = useRef(false);
    const callbacksRef = useRef({ onSessionExpired, onRequestError });

    useEffect(() => {
        callbacksRef.current = { onSessionExpired, onRequestError };
    });

    // Sync local state when server data changes, but only if user isn't clicking
    useEffect(() => {
        const serverQty = item?.qty ?? 0;
        lastConfirmedQty.current = serverQty;
        if (!isInteracting.current) {
            qtyRef.current = serverQty;
            setLocalQty(serverQty);
        }
    }, [item?.qty]);

    // Debounced server sync — stable across renders (only recreates if productId changes)
    // Uses refs for callbacks so it always calls the latest version
    const debouncedSync = useMemo(
        () => debounce(async (newQty) => {
            try {
                await updateCartItem({ product_id: productId, qty: newQty }).unwrap();
                lastConfirmedQty.current = newQty;
            } catch (error) {
                // Rollback local qty AND Redux slice totals to last confirmed state
                const rollbackQty = lastConfirmedQty.current;
                qtyRef.current = rollbackQty;
                setLocalQty(rollbackQty);
                dispatch(optimisticUpdateItemQty({ productId, newQty: rollbackQty }));

                const statusCode = getErrorStatus(error);
                const errorCode = getErrorCode(error);

                if (statusCode === 401 || statusCode === 403 || errorCode === 'SESSION_EXPIRED') {
                    callbacksRef.current.onSessionExpired?.();
                    return;
                }

                callbacksRef.current.onRequestError?.(error, 'update', getErrorMessage(error));
            } finally {
                isInteracting.current = false;
            }
        }, 500),
        [productId, updateCartItem]
    );

    // Cancel pending debounce on unmount
    useEffect(() => () => debouncedSync.cancel(), [debouncedSync]);

    // qtyRef is our synchronous source of truth so dispatch always sees
    // the correct value — React's functional updater runs lazily during render,
    // which would leave a let variable undefined at dispatch time.
    const incrementQty = useCallback(() => {
        const next = qtyRef.current + 1;
        qtyRef.current = next;
        isInteracting.current = true;
        setLocalQty(next);
        dispatch(optimisticUpdateItemQty({ productId, newQty: next }));
        debouncedSync(next);
    }, [debouncedSync, dispatch, productId]);

    const decrementQty = useCallback(() => {
        const next = Math.max(1, qtyRef.current - 1);
        qtyRef.current = next;
        isInteracting.current = true;
        setLocalQty(next);
        dispatch(optimisticUpdateItemQty({ productId, newQty: next }));
        debouncedSync(next);
    }, [debouncedSync, dispatch, productId]);

    const deleteItem = useCallback(async () => {
        // Stash the full item before removing so we can rollback on failure
        const stashedItem = item ? { ...item } : null;

        // Optimistically remove from Redux immediately so UI updates fast
        dispatch(optimisticRemoveItem({ productId }));

        try {
            await deleteCartItem(productId).unwrap();
            return true;
        } catch (error) {
            // Restore the item in Redux (no network needed)
            if (stashedItem) {
                dispatch(rollbackRemoveItem({ item: stashedItem }));
            }

            const statusCode = getErrorStatus(error);
            const errorCode = getErrorCode(error);

            if (statusCode === 401 || statusCode === 403 || errorCode === 'SESSION_EXPIRED') {
                callbacksRef.current.onSessionExpired?.();
                return false;
            }

            callbacksRef.current.onRequestError?.(error, 'delete', getErrorMessage(error));
            return false;
        }
    }, [deleteCartItem, dispatch, item, productId]);

    return {
        optimisticQty: localQty,
        subtotal: localQty * (item?.price_per_case ?? 0),
        isPending: isUpdating || isDeleting,
        incrementQty,
        decrementQty,
        deleteItem,
    };
}