'use server'
require('dotenv').config({ path: 'api.env' });
import { revalidatePath } from 'next/cache';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export async function createNewOrder({ delivery_date, shipping_address_id, contact_info_id }){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        console.log('create new order with information', { delivery_date, shipping_address_id, contact_info_id })
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/checkout`, {
            method: 'POST',
            body: JSON.stringify({
                delivery_date, 
                shipping_address_id, 
                contact_info_id,
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            const errorResponse = await response.json();
            console.log(`creating new order fetch failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        }

        const responseObject = await response.json()
        console.log('is there a session url', responseObject)
        
        revalidatePath(`/account/cart`, "page")
        revalidatePath(`/account/orders`, "page") 

        redirect(responseObject.url)            
    } catch (error) {
        console.error('Network error:', error);
        throw error;       
    }

    
}


export async function updateOrderShippingInfo(){

}

export async function updateOrderedItems(){

}

export async function deleteOrder(){

}