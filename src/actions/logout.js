// pages/api/logout.js
'use server'
require('dotenv').config({ path: 'api.env' });

import { cookies } from "next/headers"
import { redirect } from 'next/navigation'

export default async function handleLogOut() {
        try {
            const allCookies = cookies();            
            const connectSidCookie = allCookies.getAll('connect.sid');            
            const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    cookie: cookieForServer 
                }
            });

            if (!response.ok) {     
                const responsefailed = response.json()  
                console.log('bad response', response.status, response.text, response.statusText)
                console.log(`log out failed on server failed`, responsefailed);
            } 

            const responseObject = await response.json()
            console.log('response ok in handler',responseObject)
            cookies().delete('connect.sid')
            cookies().delete()
            
        } catch (error) {
            console.error('Network error:', error);
            return null
        }
    console.log('DONE LOG OUT FROM SERVER!') 
    redirect('/');
}
