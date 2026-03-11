import { fetchOrdersById } from "@/lib/fetchingUserInfo";
import { redirect } from 'next/navigation';
import OrderInfoClient from './OrderInfoClient';

/**
 * Server component: fetches order data and passes to client for Redux hydration.
 * Follows the same hybrid SSR + Redux pattern as the Profile page.
 */
export default async function OrderInfo({ id }) {
    const { data, expired } = await fetchOrdersById(id);

    if (expired) {
        redirect('/login');
    }

    const order = data.orders[0];

    return <OrderInfoClient initialOrder={order} />;
}
