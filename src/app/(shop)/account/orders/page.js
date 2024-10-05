import OrderCard from "@/components/orders/OrderCard";
import { fetchAllOrdersByUser } from "@/lib/fetchingUserInfo"; 
import styles from './page.module.css'


export default async function Orders() {
  const orders = await fetchAllOrdersByUser()


  return (
    <section className={styles.orders_container}>
      <h3>My Orders</h3>
      {orders.orders.length > 0 ? (
        <ul className={styles.ordersListContainer}>
        {orders.orders.map((order) => (
          <OrderCard order={order} key={order.id}/>
        ))}
        </ul>
        ):(<p className={styles.notUserOrdersMessage}>You don't have any orders. Go ahead and place one!</p>)}         
    </section>
  )
}