'use server'

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";


export async function createNewOrder({ delivery_date, shipping_address_id, contact_info_id }){
    console.log('FETCHING CREATE NEW ORDER', delivery_date, shipping_address_id, contact_info_id)
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
            console.log(`create new checkout session FAILED`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        }

        const responseObject = await response.json() 
        return responseObject.url       

        
    } catch (error) {
        console.error('NETWORK ERROR ON CREATE NEW ORDER:', error);
        throw error;       
    }
}


export async function updateOrderShippingInfo(data, id){
    console.log('UPDATE ORDER SHIPPING INFO FETCH', data, id)
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/shipping_info`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data,
                id                
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            const errorResponse = await response.json();
            console.log(`UPDATING ORDER SHIPPING INFO FAILED`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()        
        revalidatePath(`/account/orders`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING ORDER SHIPPING INFO', error);
        throw error         
    }
}

export async function deleteOrder(id){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        console.log('delete order fetch:', id)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`, {
            method: 'DELETE',
            headers : {
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            const errorResponse = await response.json();
            console.log(`DELETING ORDER FAILED`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/orders`, "page")
        return responseObject;        
    } catch (error) {
        console.error('NETWORK ERROR DELETING ORDER:', error);
        throw error;        
    }

}