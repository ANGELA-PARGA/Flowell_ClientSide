import styles from './components.module.css'
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import dynamic from 'next/dynamic'
import { fetchOrdersById } from "@/lib/fetchingUserInfo";


const MyModalUpdateOrder = dynamic(() => import('@/UI/MyModalUpdateOrder'))
const MyModalLogin = dynamic(() => import("@/UI/MyModalLogin"))

export default async function OrderInfo({id}) {
    const {data, expired} =  await fetchOrdersById(id)
    
    if (expired) {
        console.log('data is expired on ORDER BY ID server component')
        return <MyModalLogin />;
    }   

    const order = data.orders[0];

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
                    <button type='button' className='btn_primary_standard btn_sizeM disabled-state'>Edit</button>: 
                    <MyModalUpdateOrder id={order.id} resourceType={'date'}/>                          
                }           
            </div>
            <div className={`${styles.orderInfo_subcontainer} flex-col-gap-sm`}>
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
            <div className={`${styles.orderInfo_subcontainer} flex-col-gap-sm`}>
                <h3>Shipping Information</h3>
                <p>{order.shipping_info.address}</p>
                <p>{order.shipping_info.city}</p>
                <p>{order.shipping_info.state}</p>
                <p>{order.shipping_info.zip_code}</p>
                <p>Phone: {order.shipping_info.phone}</p>
                {
                    order.status !== 'PAID' ?
                    <button className='btn_primary_standard btn_sizeM disabled-state'>Edit</button>:
                    <MyModalUpdateOrder data={order} resourceType={'address'}/>
                }
                
            </div>
        </section>
    );
}
