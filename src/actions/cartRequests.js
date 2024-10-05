'use server'

import { revalidatePath } from 'next/cache';
import { cookies } from "next/headers";

export async function fetchCartInfoByUser(){
    console.log('FETCHING CART INFO BY USER')
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
            headers : {cookie: cookieForServer}
        })

        if (!response.ok) {       
            const errorResponse = await response.json();
            console.log(`FETCHING CART INFO FAILED`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        console.log('CART INFO AFTER FETCHING', responseObject)
        return responseObject;
        
    } catch (error) {
        console.error('NETWORK ERROR ON FETCH CART INFO:', error);
        throw error;      
    }
}


export async function updateCartItem({product_id, qty}){
    console.log('UPDATE CART ITEM FETCH', product_id, qty)
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
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
            const errorResponse = await response.json();
            console.log(`UPDATING CART ITEM FAILED`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/cart`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR ON UPDATE CART ITEM:', error);
        throw error         
    }
}

export async function deleteCartItem(id){
    console.log('DELETE CART ITEM ID FETCH:', id)
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/${id}`, {
            method: 'DELETE',
            headers : {
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            const errorResponse = await response.json();
            console.log(`DELETE CART ITEM FAILED`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/cart`, "page")
        return responseObject; 

    } catch (error) {
        console.error('NETWORK ERROR ON DELETE CART ITEM:', error);
        throw error;        
    }
}