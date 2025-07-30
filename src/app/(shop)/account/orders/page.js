import OrderCard from "@/components/orders/OrderCard";
import { fetchAllOrdersByUser } from "@/lib/fetchingUserInfo"; 
import { getSessionUser } from "@/lib/getSessionUser";
import styles from '../page.module.css'
import dynamic from 'next/dynamic'

const MyModalLogin = dynamic(()=> import("@/UI/MyModalLogin"))

export default async function Orders() {
  /* @next-codemod-ignore */
  const session = await getSessionUser();
  if (!session) {
      return <MyModalLogin />;
  }
  
  const {orders, expired} = await fetchAllOrdersByUser();

  if (expired) {
      return <MyModalLogin />;
  }

  return (
    <section className='flex-col-gap'>
      <h3>My Orders</h3>
      {orders.orders.length > 0 ? (
        <ul className={styles.ordersListContainer}>
        {orders.orders.map((order) => (
          <OrderCard order={order} key={order.id}/>
        ))}
        </ul>
        ):(<h4 className={styles.notUserOrdersMessage}>You don't have any orders. Go ahead and place one!</h4>)}         
    </section>
  )
}