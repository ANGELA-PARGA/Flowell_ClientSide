import Link from "next/link";
import styles from './components.module.css'
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import dynamic from "next/dynamic";

const MyModalCancelOrder = dynamic(() => import("@/UI/MyModalCancel"))

export default function OrderCard({order}) {
    return (
        <li key={order.id} className={`${styles.order_details_subcontainer} flex-col-gap-sm`}>
            <h3>Order #{order.id}</h3>
            <div>
                <p><span>Total:</span> ${order.total.toFixed(2)} </p>
                <p><span>Status:</span> {order.status}</p>
                <p><span>Delivery Date:</span> {format(parseISO(order.delivery_date), 'EE, MMMM d yyyy')}</p>
            </div>
            <div >
                <Link href={`/account/orders/${order.id}`}><button className='btn_primary_standard btn_sizeM'>View Order</button></Link>
            </div>
            {
                order.status === 'PENDING' || order.status === 'PAID' && <MyModalCancelOrder id={order.id} />
            }            
        </li>
    );
}

