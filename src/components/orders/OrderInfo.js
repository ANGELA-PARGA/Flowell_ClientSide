'use client'

import styles from './components.module.css'
import { format, parseISO } from "date-fns";
import ChangeOrderShippingForm from '../forms/ChangeOrderShippingForm';
import ChangeOrderDateForm from '../forms/ChangeOrderDateForm';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function OrderInfo({userOrder, userData}) {   
    const searchParams = useSearchParams();
    const router = useRouter();
    const formRef = useRef(null);

    const order = userOrder[0];

    const handleOnClickDelivery = (e) =>{
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams.toString()); 
        currentParams.set('edit', 'delivery'); 
        router.replace(`?${currentParams.toString()}`);
    }

    const handleOnClickShipping = (e) =>{
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('edit', 'shipping'); 
        router.replace(`?${currentParams.toString()}`);
    }

    const handleOnCancel = (e) =>{
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('edit');
        router.replace(`?${currentParams.toString()}`);
    }

    setTimeout(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
            window.scrollBy(0, -73);
        }
    }, 100); 

    return (
        <section className={styles.orderInfo_container}>
            <div className={styles.orderInfo_subcontainer}>
                <h3>Order #{order.id}</h3>
                <p>Created: {format(parseISO(order.created), 'EE, MMMM d yyyy')}</p>
                <p>Status: {order.status}</p>
            </div>
            <div className={styles.orderInfo_subcontainer}>
                <h3>Delivery Date</h3>
                <p>Delivery date: {format(parseISO(order.delivery_date), 'EE, MMMM d yyyy')}</p>
                {
                    order.status === 'DELIVERED' || order.status === 'IN TRANSIT' ?
                    <button type='button' disabled>Edit</button>: 
                    <button type='button' onClick={(e) => handleOnClickDelivery(e)}>Edit</button>                          
                }
                {
                    searchParams.get('edit') === 'delivery' && <button type='button' onClick={(e) => handleOnCancel(e)}>Cancel</button>  
                }
                {
                    searchParams.get('edit') === 'delivery' && 
                    <>
                    <div ref={formRef}></div>
                    <ChangeOrderDateForm id={order.id}/>
                    </>
                }           
            </div>
            <div className={styles.orderInfo_subcontainer}>
                <h3>Items</h3>
                <ul className={styles.ordered_items_container}>
                    {order.items.map((item)=>{            
                        return (
                        <li key={item.product_id} className={styles.ordered_items}>
                            <p>Item: {item.name}</p>
                            <p>Quantity: {item.qty} case</p>
                        </li>
                        )            
                    })}
                </ul>
            </div>
            <div>
                <br />
                <h3>Total: ${order.total.toFixed(2)}</h3>
                <br />
            </div>
            <div className={styles.orderInfo_subcontainer}>
                <h3>Shipping Information</h3>
                <p>{order.shipping_info.address}</p>
                <p>{order.shipping_info.city}</p>
                <p>{order.shipping_info.state}</p>
                <p>{order.shipping_info.zip_code}</p>
                <p>Phone: {order.shipping_info.phone}</p>
                {
                    order.status === 'DELIVERED' || order.status === 'IN TRANSIT' ?
                    <button disabled>Edit</button>:<button type='button' onClick={(e) => handleOnClickShipping(e)}>Edit</button>
                }
                {
                    searchParams.get('edit') === 'shipping' && <button type='button' onClick={(e) => handleOnCancel(e)}>Cancel</button>
                }
                {
                    searchParams.get('edit') === 'shipping' &&
                    <>
                    <div ref={formRef}></div>
                    <ChangeOrderShippingForm data={order}/>
                    </>                    
                }
            </div>
        </section>
    );
}