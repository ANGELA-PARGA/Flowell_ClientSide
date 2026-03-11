'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '@/store/orders/slice';
import { selectAllOrders } from '@/store/orders/selectors';
import OrderCard from '@/components/orders/OrderCard';
import styles from '../page.module.css';

/**
 * Orders list page using hybrid Next.js + Redux pattern
 * 
 * @param {Object} props
 * @param {Array} props.initialOrders - Server-fetched orders array (SSR)
 * 
 * Pattern:
 * 1. Server fetches fresh data on page load
 * 2. Client hydrates Redux with this data
 * 3. User actions (cancel) → Optimistic Redux updates
 * 4. On success → Redux persists, server revalidates
 * 5. On error → Redux rolls back via per-order snapshot
 */
export default function OrdersPageClient({ initialOrders }) {
    const dispatch = useDispatch();
    const orders = useSelector(selectAllOrders);

    useEffect(() => {
        if (initialOrders) {
            dispatch(setOrders(initialOrders));
        }
    }, [initialOrders, dispatch]);

    return (
        <section className='flex-col-gap'>
            <h3>My Orders</h3>
            {orders.length > 0 ? (
                <ul className={styles.ordersListContainer}>
                    {orders.map((order) => (
                        <OrderCard order={order} key={order.id} />
                    ))}
                </ul>
            ) : (
                <h4 className={styles.notUserOrdersMessage}>
                    You don&apos;t have any orders. Go ahead and place one!
                </h4>
            )}
        </section>
    );
}
