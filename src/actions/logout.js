// pages/api/logout.js
'use server'
import { cookies } from "next/headers";
import { cookieFetchVerification } from "@/lib/cookieVerification";

export default async function handleLogOut() {
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
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
                return { expired: true };
            }      
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 
        (await cookies()).delete('connect.sid')
        await response.json()
        
    } catch (error) {
        console.error('NETWORK ERROR LOGGING OUT:', error);
        throw error
    }    
}
