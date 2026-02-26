import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";
import CheckoutDashboard from "@/components/checkout/CheckoutDashboard";
import styles from './page.module.css'
import { Suspense } from "react";
import LoadingCheckout from "@/UI/LoadingCheckout";
import { redirect } from "next/navigation";

export default async function Checkout() { 
  const session = await getServerSession(authOptions);
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
