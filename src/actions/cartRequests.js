'use server'

import { revalidatePath } from 'next/cache';
import { cookieFetchVerification } from '@/lib/cookieVerification';

export async function fetchCartInfoByUser(){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
            headers : {cookie: cookieForServer}
        })

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                return { expired: true };
            }      
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('NETWORK ERROR ON FETCH CART INFO:', error);
        throw error;      
    }
}


export async function updateCartItem({product_id, qty}){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
            method: 'PATCH',
            body: JSON.stringify({
                product_id,
                qty
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
        revalidatePath(`/account/cart`)
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR ON UPDATE CART ITEM:', error);
        throw error         
    }
}

export async function deleteCartItem(id){
    console.log('DELETE CART ITEM ID FETCH:', id)
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/${id}`, {
            method: 'DELETE',
            headers : {
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
        revalidatePath(`/account/cart`)
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR ON DELETE CART ITEM:', error);
        throw error;        
    }
}