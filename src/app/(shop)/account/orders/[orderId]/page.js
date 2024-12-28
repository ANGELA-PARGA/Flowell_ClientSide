import OrderInfo from "@/components/orders/OrderInfo";
import { fetchOrdersById } from "@/lib/fetchingUserInfo";
import MyModalLogin from "@/UI/MyModalLogin";

export default async function OrderById(props) {
  const params = await props.params;
  const {data, expired} =  await fetchOrdersById(params.orderId)

  if (expired) {
      console.log('data is expired on ORDER BY ID server component')
      return <MyModalLogin />;
  }

  return (
    <OrderInfo userOrder={data.orders}/>
  );
}
