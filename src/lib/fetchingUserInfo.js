import { cookieFetchVerification } from "./cookieVerification";

export async function fetchAllUserInfo(){
    console.log('CALLING SERVER FETCH USER INFO')
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
            headers : {cookie: cookieForServer}
        })

        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`getting user info failed`, errorResponse);
            throw new Error(`Error: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}


export async function fetchAllOrdersByUser(){
    console.log('CALLING SERVER FETCH ALL ORDERS INFO')
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`, {
            headers : {cookie: cookieForServer}
        })
        if (!response.ok) { 
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }       
            const errorResponse = await response.json();
            console.log(`fetching all orders by user failed`, errorResponse);
            throw new Error(`Error: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        return { orders: responseObject, expired: false };
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
}

export async function fetchOrdersById(id){
    console.log('CALLING SERVER FETCH ORDER INFO')
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`, {
            headers : {cookie: cookieForServer}
        })
        if (!response.ok) {       
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            } 
            const errorResponse = await response.json();
            console.log(`fetching order by id failed`, errorResponse);
            throw new Error(`Error: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        return { data: responseObject, expired: false };
        
    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

