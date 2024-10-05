// pages/api/logout.js
'use server'

import { cookies } from "next/headers"

export default async function handleLogOut() {
    const allCookies = cookies();            
    const connectSidCookie = allCookies.getAll('connect.sid');            
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                cookie: cookieForServer 
            }
        });

        if (!response.ok) {     
            const errorResponse = await response.json();
            console.log(`LOGGING OUT FETCH FAILED`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse.customError.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        console.log('LOGGIN OUT RESPONSE:',responseObject)
        
    } catch (error) {
        console.error('NETWORK ERROR LOGGIN OUT:', error);
        throw error
    }
    cookies().delete('connect.sid')
    console.log('DONE LOG OUT FROM SERVER!') 
    
}
