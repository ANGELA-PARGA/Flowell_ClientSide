import OrderInfo from "@/components/orders/OrderInfo";
import { Suspense } from "react";
import LoadingOrders from "@/UI/LoadingOrders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function OrderById(props) {
  const params = await props.params;
  const session = await getServerSession(authOptions);
    if (!session) {
        return <MyModalLogin />;
    }

  return (
    <Suspense fallback={<LoadingOrders/>}>
      <OrderInfo id={params.orderId}/>
    </Suspense>
    
  );
}
