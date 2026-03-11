'use server'

import { cookies } from "next/headers";
import { getSessionUser } from "./getSessionUser";
import { createSessionExpiredResponse } from "@/lib/authResponses";

export async function cookieVerification(){
    const session = await getSessionUser();
    if (!session) {
        return createSessionExpiredResponse('No active NextAuth session');
    }

    const allCookies = await cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    if(connectSidCookie.length === 0){
        return createSessionExpiredResponse('Backend session cookie is missing');
    }

    return {
        data: 'cookie is active',
        session,
        expired: false,
    };
}

export async function cookieFetchVerification() {
    const session = await getSessionUser();
    if (!session) {
        return createSessionExpiredResponse('No active NextAuth session');
    }

    const allCookies = await cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');

    if (connectSidCookie.length === 0) {
        return createSessionExpiredResponse('Backend session cookie is missing');
    }

    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`;

    return {
        cookieForServer,
        session,
        expired: false,
    };
}
