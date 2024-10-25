// pages/api/logout.js
'use server'

import { cookieFetchVerification } from "@/lib/cookieVerification";

export default async function handleLogOut() {
    console.log('HANDLE LOGOUT FROM SERVER FUNCTION')
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }

    try {        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                cookie: cookieForServer 
            }
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`LOGGING OUT FETCH FAILED`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse.customError.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        console.log('LOGGING OUT RESPONSE:',responseObject)
        
    } catch (error) {
        console.error('NETWORK ERROR LOGGING OUT:', error);
        throw error
    }
    cookies().delete('connect.sid')
    console.log('DONE LOGGED OUT FROM SERVER!') 
    
}
