/*require('dotenv').config({ path: 'api.env' });*/
import { cookies } from "next/headers";

export async function fetchAllUserInfo(){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        console.log('calling fetchAllUserInfo fetch')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
            headers : {cookie: cookieForServer}
        })

        if (!response.ok) {       
            const errorResponse = await response.json();
            console.log(`getting user info failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}


export async function fetchAllOrdersByUser(){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`, {
            headers : {cookie: cookieForServer}
        })
        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching all orders by user failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
}

export async function fetchOrdersById(id){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`, {
            headers : {cookie: cookieForServer}
        })
        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching order by id failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

