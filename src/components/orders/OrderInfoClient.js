'use client'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOrder } from '@/store/orders/slice';
import { selectSelectedOrder } from '@/store/orders/selectors';
import styles from './components.module.css';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import dynamic from 'next/dynamic';
import { ADDRESS_RESOURCE, DATE_RESOURCE } from '@/const';

const MyModalUpdateOrder = dynamic(() => import('@/UI/MyModalUpdateOrder'));

/**
 * Order detail page using hybrid Next.js + Redux pattern
 * 
 * @param {Object} props
 * @param {Object} props.initialOrder - Server-fetched order object (SSR)
 * 
 * Pattern:
 * 1. Server fetches fresh order data on page load
 * 2. Client hydrates Redux selectedOrder
 * 3. User edits (shipping/date) → Optimistic Redux updates
 * 4. On success → Redux reconciles with server response
 * 5. On error → Redux rolls back via per-order snapshot
 */
export default function OrderInfoClient({ initialOrder }) {
    const dispatch = useDispatch();
    const order = useSelector(selectSelectedOrder);

    useEffect(() => {
        if (initialOrder) {
            dispatch(setSelectedOrder(initialOrder));
        }
    }, [initialOrder, dispatch]);

    if (!order) return null;

    return (
        <section className={`${styles.orderInfo_container} flex-col-gap-sm`}>
            <div className={`${styles.orderInfo_subcontainer} flex-col-gap-sm`}>
                <h3>Order #{order.id}</h3>
                <p>Created: {format(parseISO(order.created_at), 'EE, MMMM d yyyy')}</p>
                <p>Status: {order.status}</p>
            </div>
            <div className={`${styles.orderInfo_subcontainer} flex-col-gap-sm`}>
                <h3>Delivery Date</h3>
                <p>Delivery date: {format(parseISO(order.delivery_date), 'EE, MMMM d yyyy')}</p>
                {
                    order.status !== 'PAID' ?
                    <button type='button' className='btn_primary_standard btn_sizeM disabled-state'>Edit</button> :
                    <MyModalUpdateOrder id={order.id} resourceType={DATE_RESOURCE} />
                }
            </div>
            <div className={`${styles.orderInfo_subcontainer} flex-col-gap-sm`}>
                <h3>Items</h3>
                <ul className={styles.ordered_items_container}>
                    {order.items.map((item) => (
                        <li key={item.product_id} className={styles.ordered_items}>
                            <p>Item: {item.name}</p>
                            <p>Quantity: {item.qty} case</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <br />
                <h3>Total: ${order.total.toFixed(2)}</h3>
                <br />
            </div>
            <div className={`${styles.orderInfo_subcontainer} flex-col-gap-sm`}>
                <h3>Shipping Information</h3>
                <p>{order.shipping_info.address}</p>
                <p>{order.shipping_info.city}</p>
                <p>{order.shipping_info.state}</p>
                <p>{order.shipping_info.zip_code}</p>
                <p>Phone: {order.shipping_info.phone}</p>
                {
                    order.status !== 'PAID' ?
                    <button className='btn_primary_standard btn_sizeM disabled-state'>Edit</button> :
                    <MyModalUpdateOrder data={order} resourceType={ADDRESS_RESOURCE} />
                }
            </div>
        </section>
    );
}
