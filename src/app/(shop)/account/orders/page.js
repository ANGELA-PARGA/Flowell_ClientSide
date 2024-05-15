import OrderCard from "@/_components/_layout_components/OrderCard";
import { fetchAllOrdersByUser } from "@/_utilities/ordersRequest"; 
import styles from './page.module.css'


export default async function Orders() {
  const orders = await fetchAllOrdersByUser()
  console.log(orders)

  const userOrders = {
    orders: [
      {
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
        },
      },
      {
        id: 2,
        created: '2024-03-31',
        status: 'IN TRANSIT',
        total: 350.00,
        delivery_date: '2024-05-10',
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
        },
      }
    ],
  }

  return (
    <section>
        {userOrders.orders.length > 0 ? (
          <ul className={styles.orders_container}>
          {userOrders.orders.map((order) => (
            <OrderCard order={order} key={order.id}/>
          ))}
          </ul>
          ):(<p className={styles.notUserOrdersMessage}>The user doesn't have any orders</p>)}          
    </section>
  )
}