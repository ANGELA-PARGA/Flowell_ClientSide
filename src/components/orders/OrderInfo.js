import styles from './components.module.css'
import { format, parseISO } from "date-fns";

export default function OrderInfo({userOrder}) {
    return (
        <section className={styles.orderInfo_container}>
            <div className={styles.orderInfo_subcontainer}>
                <h2>Order #{userOrder[0].id}</h2>
                <p>Created: {format(parseISO(userOrder[0].created), 'EE, MMMM d yyyy')}</p>
                <p>Status: {userOrder[0].status}</p>
            </div>
            <div className={styles.orderInfo_subcontainer}>
                <h3>Delivery Date</h3>
                <p>Delivery date: {format(parseISO(userOrder[0].delivery_date), 'EE, MMMM d yyyy')}</p>
                {
                    userOrder.status === 'DELIVERED' || userOrder.status === 'IN TRANSIT' ?
                    (<button disabled>Update</button>):( <button>Update</button>)
                }            
            </div>
            <div className={styles.orderInfo_subcontainer}>
                <h3>Items</h3>
                <ul>
                    {userOrder[0].items.map((item)=>{            
                        return (
                        <li key={item.product_id}>
                            <p>Item: {item.name}</p>
                            <p>Quantity: {item.qty} case</p>
                            {
                            userOrder.status === 'DELIVERED' || userOrder.status === 'IN TRANSIT' ?
                            (<button disabled>Update</button>):( <button>Update</button>)
                            }
                        </li>
                        )            
                    })}
                </ul>
            </div>
            <div>
                <h3>Total: ${userOrder[0].total.toFixed(2)}</h3>
            </div>
            <div className={styles.orderInfo_subcontainer}>
                <h3>Shipping Information</h3>
                <p>{userOrder[0].shipping_info.address}</p>
                <p>{userOrder[0].shipping_info.city}</p>
                <p>{userOrder[0].shipping_info.state}</p>
                <p>{userOrder[0].shipping_info.zip_code}</p>
                <p>Phone: {userOrder[0].shipping_info.phone}</p>
                {userOrder[0].status === 'DELIVERED' || userOrder[0].status === 'IN TRANSIT' ?
                    (<button disabled>Change Address</button>):( <button>Change Address</button>)
                }
            </div>
        </section>
    );
}