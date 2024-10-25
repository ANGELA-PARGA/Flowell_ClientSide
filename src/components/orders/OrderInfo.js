import styles from './components.module.css'
import { format, parseISO } from "date-fns";
import MyModalUpdateOrder from '@/UI/MyModalUpdateOrder';

export default function OrderInfo({userOrder}) {   
    const order = userOrder[0];

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
                    <MyModalUpdateOrder id={order.id} resourceType={'date'}/>                          
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
                    <button disabled>Edit</button>:
                    <MyModalUpdateOrder data={order} resourceType={'address'}/>
                }
                
            </div>
        </section>
    );
}
