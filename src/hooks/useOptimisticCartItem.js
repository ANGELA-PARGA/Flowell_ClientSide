'use client';

import { startTransition, useCallback, useEffect, useMemo, useOptimistic, useRef, useState } from 'react';
import { useDeleteCartItemMutation, useUpdateCartItemMutation } from '@/store/cart/cartApi';

const getErrorStatus = (error) => error?.status ?? error?.originalStatus ?? null;
const getErrorCode = (error) => error?.data?.code ?? null;
const getErrorMessage = (error) => error?.data?.message ?? null;
const isDev = process.env.NODE_ENV !== 'production';

export function useOptimisticCartItem({ item, productId, onSessionExpired, onRequestError }) {
    const initialQty = item?.qty ?? 0;
    const [displayQty, setDisplayQty] = useState(initialQty);

    const [optimisticQty, setOptimisticQty] = useOptimistic(
        initialQty,
        (_currentQty, newQty) => newQty
    );

    const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
    const [deleteCartItem, { isLoading: isDeleting }] = useDeleteCartItemMutation();

    const pendingQtyRef = useRef(initialQty);
    const committedQtyRef = useRef(initialQty);
    const isFlushingRef = useRef(false);

    useEffect(() => {
        const serverQty = item?.qty ?? 0;
        committedQtyRef.current = serverQty;

        if (!isFlushingRef.current) {
            pendingQtyRef.current = serverQty;
            setDisplayQty(serverQty);
            startTransition(() => {
                setOptimisticQty(serverQty);
            });
        }
    }, [item?.qty, setOptimisticQty]);

    const isPending = isUpdating || isDeleting;

    const subtotal = useMemo(
        () => displayQty * (item?.price_per_case ?? 0),
        [displayQty, item?.price_per_case]
    );

    const flushQtyUpdates = useCallback(async () => {
        if (isFlushingRef.current) {
            return;
        }

        isFlushingRef.current = true;

        try {
            while (pendingQtyRef.current !== committedQtyRef.current) {
                const targetQty = pendingQtyRef.current;

                if (isDev) {
                    console.log('[useOptimisticCartItem] flush start', {
                        productId,
                        committedQty: committedQtyRef.current,
                        targetQty,
                    });
                }

                try {
                    await updateCartItem({ product_id: productId, qty: targetQty }).unwrap();
                    committedQtyRef.current = targetQty;

                    if (isDev) {
                        console.log('[useOptimisticCartItem] flush success', {
                            productId,
                            committedQty: committedQtyRef.current,
                            pendingQty: pendingQtyRef.current,
                        });
                    }
                } catch (error) {
                    pendingQtyRef.current = committedQtyRef.current;
                    setDisplayQty(committedQtyRef.current);
                    startTransition(() => {
                        setOptimisticQty(committedQtyRef.current);
                    });

                    const statusCode = getErrorStatus(error);
                    const errorCode = getErrorCode(error);

                    if (statusCode === 401 || statusCode === 403 || errorCode === 'SESSION_EXPIRED') {
                        onSessionExpired?.();
                        return;
                    }

                    onRequestError?.(error, 'update', getErrorMessage(error));
                    return;
                }
            }
        } finally {
            isFlushingRef.current = false;
        }
    }, [onRequestError, onSessionExpired, productId, setOptimisticQty, updateCartItem]);

    const applyQty = useCallback(async (newQty) => {
        const safeQty = Math.max(1, newQty);

        if (isDev) {
            console.log('[useOptimisticCartItem] queue qty', {
                productId,
                currentPendingQty: pendingQtyRef.current,
                requestedQty: safeQty,
            });
        }

        pendingQtyRef.current = safeQty;
        setDisplayQty(safeQty);
        startTransition(() => {
            setOptimisticQty(safeQty);
        });

        await flushQtyUpdates();
    }, [flushQtyUpdates, setOptimisticQty]);

    const incrementQty = useCallback(() => {
        const nextQty = pendingQtyRef.current + 1;
        void applyQty(nextQty);
    }, [applyQty]);

    const decrementQty = useCallback(() => {
        const nextQty = Math.max(1, pendingQtyRef.current - 1);
        void applyQty(nextQty);
    }, [applyQty]);

    const deleteItem = useCallback(async () => {
        if (isFlushingRef.current) {
            return false;
        }

        try {
            await deleteCartItem(productId).unwrap();
            return true;
        } catch (error) {
            const statusCode = getErrorStatus(error);
            const errorCode = getErrorCode(error);

            if (statusCode === 401 || statusCode === 403 || errorCode === 'SESSION_EXPIRED') {
                onSessionExpired?.();
                return false;
            }

            onRequestError?.(error, 'delete', getErrorMessage(error));
            return false;
        }
    }, [deleteCartItem, onRequestError, onSessionExpired, productId]);

    return {
        optimisticQty: displayQty,
        reconciledQty: optimisticQty,
        subtotal,
        isPending,
        updateQty: applyQty,
        incrementQty,
        decrementQty,
        deleteItem,
    };
}
