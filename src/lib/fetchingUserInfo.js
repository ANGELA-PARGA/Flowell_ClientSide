import { cookieFetchVerification } from "./cookieVerification";

export async function fetchAllUserInfo(){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
            cache: 'force-cache',
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
        return { data: responseObject, expired: false };
    
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;        
    }
}


export async function fetchAllOrdersByUser(){  
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`, {
            cache: 'force-cache',
            next: { tags: ['orders'] },
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
        return { orders: responseObject, expired: false };
        
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
}

export async function fetchOrdersById(id){

    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${id}`, {
            cache: 'force-cache',
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
        return { data: responseObject, expired: false };
        
    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

