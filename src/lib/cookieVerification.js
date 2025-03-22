'use server'

import { cookies } from "next/headers";

export async function cookieVerification(){
    const allCookies = await cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    if(connectSidCookie.length === 0){
        return { data: null, expired: true };
    }
    return { data: 'cookie is active', expired: false}
}

export async function cookieFetchVerification() {
    const allCookies = await cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');

    if (connectSidCookie.length === 0) {
        return { expired: true }; // Indicate session expiration
    }

    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`;
    return { cookieForServer, expired: false }; // Valid cookie
}
