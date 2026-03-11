import { getSessionUser } from "@/lib/getSessionUser";
import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";
import CheckoutDashboard from "@/components/checkout/CheckoutDashboard";
import { Suspense } from "react";
import LoadingCheckout from "@/UI/LoadingCheckout";
import { redirect } from "next/navigation";
import styles from './page.module.css'


export default async function Checkout() { 
  const session = await getSessionUser();
  if (!session) {
      redirect('/login');
  }

  const {data, expired} = await fetchAllUserInfo();

    if (expired) {
        redirect('/login');
    }

  return (
    <section className={`${styles.cartContainer} flex-col-gap`}>
      <h2>Checkout</h2>
        <Suspense fallback={<LoadingCheckout/>}>
          <CheckoutDashboard data={data.user}/> 
        </Suspense>
    </section>
  );
}
