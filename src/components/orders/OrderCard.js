import Link from "next/link";
import styles from './components.module.css'

export default function OrderCard({order}) {
    return (
        <li key={order.id} className={styles.order_details_subcontainer}>
            <h2>Order #{order.id}</h2>
            <div>
                <p><span>Total:</span> ${order.total.toFixed(2)} </p>
                <p><span>Status:</span> {order.status}</p>
                <p><span>Delivery Date:</span> {order.delivery_date}</p>
            </div>
            <div>
                <Link href={`/account/orders/${order.id}`}><button>View Order</button></Link>
            </div>
        </li>
    );
}