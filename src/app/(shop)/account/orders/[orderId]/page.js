import { getSessionUser } from "@/lib/getSessionUser";
import OrderInfo from "@/components/orders/OrderInfo";
import { Suspense } from "react";
import LoadingOrders from "@/UI/LoadingOrders";


export default async function OrderById(props) {
  const params = await props.params;
  /* @next-codemod-ignore */
  const session = await getSessionUser();
    if (!session) {
        return <MyModalLogin />;
    }

  return (
    <Suspense fallback={<LoadingOrders/>}>
      <OrderInfo id={params.orderId}/>
    </Suspense>
    
  );
}
