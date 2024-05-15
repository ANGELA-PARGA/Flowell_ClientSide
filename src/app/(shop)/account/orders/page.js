import OrderCard from "@/_components/_layout_components/OrderCard";
import { fetchAllOrdersByUser } from "@/_utilities/ordersRequest"; 
import styles from './page.module.css'


export default async function Orders() {
  const orders = await fetchAllOrdersByUser()
  console.log(orders)


  return (
    <section>
        {orders.orders.length > 0 ? (
          <ul className={styles.orders_container}>
          {userOrders.orders.map((order) => (
            <OrderCard order={order} key={order.id}/>
          ))}
          </ul>
          ):(<p className={styles.notUserOrdersMessage}>The user doesn't have any orders</p>)}          
    </section>
  )
}