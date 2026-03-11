import { fetchAllOrdersByUser } from "@/lib/fetchingUserInfo"; 
import { getSessionUser } from "@/lib/getSessionUser";
import { redirect } from "next/navigation";
import OrdersPageClient from './OrdersPageClient';

export default async function Orders() {
  const session = await getSessionUser();
  if (!session) {
    redirect('/login');
  }
  
  const {orders, expired} = await fetchAllOrdersByUser();

  if (expired) {
    redirect('/login');
  }

  return <OrdersPageClient initialOrders={orders.orders} />;
}