import Link from "next/link";
import styles from './components.module.css'
import { format, parseISO } from "date-fns";
import MyModalCancelOrder from "@/UI/MyModalCancel";

export default function OrderCard({order}) {
    return (
        <li key={order.id} className={styles.order_details_subcontainer}>
            <h3>Order #{order.id}</h3>
            <div>
                <p><span>Total:</span> ${order.total.toFixed(2)} </p>
                <p><span>Status:</span> {order.status}</p>
                <p><span>Delivery Date:</span> {format(parseISO(order.delivery_date), 'EE, MMMM d yyyy')}</p>
            </div>
            <div >
                <Link href={`/account/orders/${order.id}`}><button>View Order</button></Link>
            </div>
            <MyModalCancelOrder id={order.id}/>            
        </li>
    );
}

