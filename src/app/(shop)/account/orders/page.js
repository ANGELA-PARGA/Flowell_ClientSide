import OrderCard from "@/components/orders/OrderCard";
import { fetchAllOrdersByUser } from "@/lib/fetchingUserInfo"; 
import styles from './page.module.css'


export default async function Orders() {
  const orders = await fetchAllOrdersByUser()
  console.log('orders in Order component', orders) 

  return (
    <section>
        {orders.orders.length > 0 ? (
          <ul className={styles.orders_container}>
          {userOrders.orders.map((order) => (
            <OrderCard order={order} key={order.id}/>
          ))}
          </ul>
          ):(<p className={styles.notUserOrdersMessage}>You don't have any orders. Go ahead and place one!</p>)}          
    </section>
  )
}