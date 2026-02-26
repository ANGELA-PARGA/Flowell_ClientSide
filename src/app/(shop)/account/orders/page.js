import OrderCard from "@/components/orders/OrderCard";
import { fetchAllOrdersByUser } from "@/lib/fetchingUserInfo"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import styles from '../page.module.css'
import { redirect } from "next/navigation";

export default async function Orders() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  
  const {orders, expired} = await fetchAllOrdersByUser();

  if (expired) {
    redirect('/login');
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