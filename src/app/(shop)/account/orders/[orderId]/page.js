import OrderInfo from "@/_components/_layout_components/OrderInfo";
import { fetchOrdersById } from "@/_utilities/ordersRequest";

export default async function OrderById({params}) {
  const data = await fetchOrdersById(params.orderId)
  console.log(data)


  const userOrder = {
    id: 1,
    created: '2024-03-31',
    status: 'DELIVERED',
    total: 150.00,
    delivery_date: '2024-05-01',
    items:[
      {
        order_id: 1,
        product_id: 2,
        name: 'Chablis White Roses (120 stems per case - 60 cm stem length)',
        qty: 1
      }
    ],
    shipping_info:{
      address: "4301 N MICHIGAN. AVENUE",
      city: "MIAMI",
      state: "FLORIDA",
      zip_code: 33141,
      phone: "123-000-7890"
    }
  }

  return (
    <OrderInfo userOrder={userOrder}/>
  );
}
