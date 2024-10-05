import Link from "next/link";
import styles from './components.module.css'
import { format, parseISO } from "date-fns";
import ButtonCancelOrder from "@/UI/ButtonCancelOrder";

export default function OrderCard({order}) {
    return (
        <li key={order.id} className={styles.order_details_subcontainer}>
            <h3>Order #{order.id}</h3>
            <div>
                <p><span>Total:</span> ${order.total.toFixed(2)} </p>
                <p><span>Status:</span> {order.status}</p>
                <p><span>Delivery Date:</span> {format(parseISO(order.delivery_date), 'EE, MMMM d yyyy')}</p>
            </div>
            <div>
                <Link href={`/account/orders/${order.id}`}><button type="button">View Order</button></Link>
            </div>
            <div>
                <ButtonCancelOrder id={order.id} />
            </div>
        </li>
    );
}