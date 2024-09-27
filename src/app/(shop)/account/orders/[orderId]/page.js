import OrderInfo from "@/components/orders/OrderInfo";
import { fetchOrdersById } from "@/lib/fetchingUserInfo";


export default async function OrderById({params}) {
  
  const data = await fetchOrdersById(params.orderId)
  console.log('order in OrderById component', data)

  return (
    <OrderInfo userOrder={data.orders}/>
  );
}
