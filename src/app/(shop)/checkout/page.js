import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";
import CheckoutDashboard from "@/components/checkout/CheckoutDashboard";
import styles from './page.module.css'


export default async function Checkout() { 
  const data = await fetchAllUserInfo();
  console.log('user info in Checkout component', data)

  return (
    <section className={styles.cartContainer}>
      <h2>Checkout</h2>
      <CheckoutDashboard data={data.user}/>      
    </section>
  );
}
