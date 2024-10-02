'use server'

import { cookies } from "next/headers";


export async function createNewOrder({ delivery_date, shipping_address_id, contact_info_id }){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
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
            console.log(`create new checkout session to create new order failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        }

        const responseObject = await response.json() 
        console.log('receiving url to redirect checkout', responseObject)
        return responseObject.url       

        
    } catch (error) {
        console.error('Network error on order request:', error);
        throw error;       
    }
}


export async function updateOrderShippingInfo(){

}

export async function updateOrderedItems(){

}

export async function deleteOrder(){

}