'use server'
require('dotenv').config({ path: 'api.env' });

import { cookies } from "next/headers"

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


export async function updateCartItem(){

}

export async function deleteCartItem(){

}