'use server'
require('dotenv').config({ path: 'api.env' });

import { cookies } from "next/headers"
import { revalidatePath } from 'next/cache'

export async function fetchCartInfoByUser(){
    try {
        const allCookies = cookies();
        const connectSidCookie = allCookies.getAll('connect.sid');
        const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
            headers : {cookie: cookieForServer}
        })

        if (!response.ok) {       
            console.log(`fetch failed`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('Network error:', error);
        return null        
    }
}


export async function updateCartItem({cart_id, product_id, qty}){
    try {
        console.log('update cart item fetch:', {cart_id, product_id, qty})
        const allCookies = cookies();
        const connectSidCookie = allCookies.getAll('connect.sid');
        const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
            method: 'PATCH',
            body: JSON.stringify({
                cart_id,
                product_id,
                qty
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            console.log(` update item in cart fetch failed`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/cart`, "page")
        return responseObject;        
    } catch (error) {
        
    }
}

export async function deleteCartItem(){

}