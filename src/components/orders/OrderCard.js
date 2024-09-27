import Link from "next/link";
import styles from './components.module.css'
import { format, parseISO } from "date-fns";

export default function OrderCard({order}) {
    return (
        <li key={order.id} className={styles.order_details_subcontainer}>
            <h2>Order #{order.id}</h2>
            <div>
                <p><span>Total:</span> ${order.total.toFixed(2)} </p>
                <p><span>Status:</span> {order.status}</p>
                <p><span>Delivery Date:</span> {format(parseISO(order.delivery_date), 'EE, MMMM d yyyy')}</p>
            </div>
            <div>
                <Link href={`/account/orders/${order.id}`}><button>View Order</button></Link>
            </div>
        </li>
    );
}