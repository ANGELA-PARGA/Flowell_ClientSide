'use server'

import { cookieFetchVerification } from "@/lib/cookieVerification";
import { revalidatePath } from "next/cache";


export async function createNewOrder({ delivery_date, address, city, state, zip_code, contact_phone }){
    console.log('FETCHING CREATE NEW ORDER', delivery_date, address, city, state, zip_code, contact_phone)
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/checkout`, {
            method: 'POST',
            body: JSON.stringify({
                delivery_date, 
                address, 
                city, 
                state, 
                zip_code, 
                contact_phone
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }       
            const errorResponse = await response.json();
            console.log(`create new checkout session FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse?.customError?.message || errorResponse.error}`);
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
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }

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
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }     
            const errorResponse = await response.json();
            console.log(`UPDATING ORDER SHIPPING INFO FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()        
        revalidatePath(`/account/orders`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING ORDER SHIPPING INFO', error);
        throw error         
    }
}

export async function updateOrderDeliverydateInfo(data, id){
    console.log('UPDATE ORDER DELIVERY DAY FETCH', data, id)
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/delivery_date`, {
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
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`UPDATING ORDER DELIVERY DATE FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()        
        revalidatePath(`/account/orders`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING DELIVERY DATE INFO', error);
        throw error         
    }
}

export async function deleteOrder(id){
    console.log('DELETE ORDER FETCH', id)
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }
    try {
        console.log('delete order fetch:', id)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`, {
            method: 'DELETE',
            headers : {
                cookie: cookieForServer
            }
        })

        if (!response.ok) {   
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }     
            const errorResponse = await response.json();
            console.log(`DELETING ORDER FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/orders`, "page")
        return responseObject;        
    } catch (error) {
        console.error('NETWORK ERROR DELETING ORDER:', error);
        throw error;        
    }

}