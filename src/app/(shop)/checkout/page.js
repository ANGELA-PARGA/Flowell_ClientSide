import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";
import MyModalLogin from "@/UI/MyModalLogin";
import CheckoutDashboard from "@/components/checkout/CheckoutDashboard";
import styles from './page.module.css'


export default async function Checkout() { 
  const {data, expired} = await fetchAllUserInfo();

    if (expired) {
        console.log('data is expired on PROFILE server component')
        return <MyModalLogin />;
    }

  return (
    <section className={styles.cartContainer}>
      <h2>Checkout</h2>
      <CheckoutDashboard data={data.user}/>      
    </section>
  );
}
