'use server'
require('dotenv').config({ path: 'api.env' });
import { revalidatePath } from 'next/cache';
import { cookies } from "next/headers";

export async function fetchCartInfoByUser(){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
            headers : {cookie: cookieForServer}
        })

        if (!response.ok) {       
            const errorResponse = await response.json();
            console.log(`getting cart info failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;      
    }
}


export async function updateCartItem({product_id, qty}){
    console.log('calling update cart item server', product_id, qty)
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        console.log('update cart item fetch:', {product_id, qty})
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
            console.log(`updating cart item failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/cart`, "page")
        return responseObject; 

    } catch (error) {
        console.error('Network error:', error);
        throw error         
    }
}

export async function deleteCartItem(id){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        console.log('delete cart item fetch:', id)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/${id}`, {
            method: 'DELETE',
            headers : {
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            const errorResponse = await response.json();
            console.log(`deleting cart item failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/cart`, "page")
        return responseObject;        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}