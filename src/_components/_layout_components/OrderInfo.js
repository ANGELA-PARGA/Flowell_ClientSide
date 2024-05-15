import styles from './components.module.css'

export default function OrderInfo({userOrder}) {
    return (
        <section className={styles.orderInfo_container}>
            <div className={styles.orderInfo_subcontainer}>
                <h2>Order #{userOrder.id}</h2>
                <p>Created: {userOrder.created}</p>
                <p>Status: {userOrder.status}</p>
            </div>
            <div className={styles.orderInfo_subcontainer}>
                <h3>Delivery Date</h3>
                <p>Delivery date: {userOrder.delivery_date}</p>
                {
                    userOrder.status === 'DELIVERED' || userOrder.status === 'IN TRANSIT' ?
                    (<button disabled>Update</button>):( <button>Update</button>)
                }            
            </div>
            <div className={styles.orderInfo_subcontainer}>
                <h3>Items</h3>
                <ul>
                    {userOrder.items.map((item)=>{            
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
                <h3>Total: ${userOrder.total.toFixed(2)}</h3>
            </div>
            <div className={styles.orderInfo_subcontainer}>
                <h3>Shipping Information</h3>
                <p>{userOrder.shipping_info.address}</p>
                <p>{userOrder.shipping_info.city}</p>
                <p>{userOrder.shipping_info.state}</p>
                <p>{userOrder.shipping_info.zip_code}</p>
                <p>Phone:{userOrder.shipping_info.phone}</p>
                {userOrder.status === 'DELIVERED' || userOrder.status === 'IN TRANSIT' ?
                    (<button disabled>Change Address</button>):( <button>Change Address</button>)
                }
            </div>
        </section>
    );
}