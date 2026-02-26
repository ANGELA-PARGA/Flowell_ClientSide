'use server'
import { cookies } from "next/headers";
import { cookieFetchVerification } from "@/lib/cookieVerification";
import { createSessionExpiredResponse, isUnauthorizedStatus } from "@/lib/authResponses";

export default async function handleLogOut() {
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return createSessionExpiredResponse();
    }

    try {        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                cookie: cookieForServer 
            }
        });

        if (!response.ok) {
            if (isUnauthorizedStatus(response.status)) {
                return createSessionExpiredResponse();
            }      
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        }
        
        (await cookies()).delete('connect.sid');
        
        await response.json();
        return { expired: false };
        
    } catch (error) {
        console.error('NETWORK ERROR LOGGING OUT:', error);
        throw error
    }    
}
