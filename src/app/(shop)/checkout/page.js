import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";
import CheckoutDashboard from "@/components/checkout/CheckoutDashboard";
import styles from './page.module.css'
import dynamic from 'next/dynamic'
import { Suspense } from "react";
import LoadingCheckout from "@/UI/LoadingCheckout";

const MyModalLogin = dynamic(()=> import("@/UI/MyModalLogin"))

export default async function Checkout() { 

  const {data, expired} = await fetchAllUserInfo();

    if (expired) {
        return <MyModalLogin />;
    }

  return (
    <section className={styles.cartContainer}>
      <h2>Checkout</h2>
        <Suspense fallback={<LoadingCheckout/>}>
          <CheckoutDashboard data={data.user}/> 
        </Suspense>
    </section>
  );
}
