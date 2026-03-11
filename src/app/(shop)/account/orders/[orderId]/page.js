import OrderInfo from "@/components/orders/OrderInfo";
import { Suspense } from "react";
import LoadingOrders from "@/UI/LoadingOrders";
import { getSessionUser } from "@/lib/getSessionUser";
import { redirect } from "next/navigation";


export default async function OrderById(props) {
  const params = await props.params;
  const session = await getSessionUser();
    if (!session) {
        redirect('/login');
    }

  return (
    <Suspense fallback={<LoadingOrders/>}>
      <OrderInfo id={params.orderId}/>
    </Suspense>
    
  );
}
