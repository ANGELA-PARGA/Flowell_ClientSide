'use server'

import { cookieFetchVerification } from "@/lib/cookieVerification";
import { revalidatePath } from "next/cache";


export async function createNewOrder({ delivery_date, address, city, state, zip_code, phone }){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
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
                phone
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                return { expired: true };
            }       
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        }

        const responseObject = await response.json() 
        return responseObject.url       

        
    } catch (error) {
        console.error('NETWORK ERROR ON CREATE NEW ORDER:', error);
        throw error;       
    }
}


export async function updateOrderShippingInfo(data, id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/shipping_info`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data               
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) {  
            if (response.status === 401 || response.status === 403) {
                return { expired: true };
            }     
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()     
        revalidatePath(`/account/orders/${id}`)
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING ORDER SHIPPING INFO', error);
        throw error         
    }
}

export async function updateOrderDeliverydateInfo(data, id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}/delivery_date`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data                
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                return { expired: true };
            }      
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()      
        revalidatePath(`/account/orders/${id}`)
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR UPDATING DELIVERY DATE INFO', error);
        throw error         
    }
}

export async function cancelOrder(id){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`, {
            method: 'PATCH',
            headers : {
                cookie: cookieForServer
            }
        })

        if (!response.ok) {   
            if (response.status === 401 || response.status === 403) {
                return { expired: true };
            }     
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/orders`)
        return responseObject;        
    } catch (error) {
        console.error('NETWORK ERROR DELETING ORDER:', error);
        throw error;        
    }

}