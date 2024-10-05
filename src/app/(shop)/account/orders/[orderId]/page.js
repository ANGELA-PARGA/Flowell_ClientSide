import OrderInfo from "@/components/orders/OrderInfo";
import { fetchOrdersById } from "@/lib/fetchingUserInfo";
import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";


export default async function OrderById({params}) {  
  const data = await fetchOrdersById(params.orderId)
  const userData = await fetchAllUserInfo();
  
  return (
    <OrderInfo userOrder={data.orders} userData={userData}/>
  );
}
