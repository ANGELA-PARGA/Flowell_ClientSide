'use server'
require('dotenv').config({ path: 'api.env' });

import { cookies } from "next/headers"
import { revalidatePath } from 'next/cache'

export async function fetchAllUserInfo(){

    try {
        const allCookies = cookies();
        const connectSidCookie = allCookies.getAll('connect.sid');
        const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
            headers : {cookie: cookieForServer}
        })

        if (!response.ok) {       
            console.log(`fetching user personal information failed`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('Network error:', error);
        return null        
    }
}

/*it requieres an url param string indicating the resourceType and an ID param indicating the resource to update */
export async function updatePersonalInfo(data, resourceType, resourceId){
    try {
        console.log('calling updatePersonalInfo fetch:', data)
        const allCookies = cookies();
        const connectSidCookie = allCookies.getAll('connect.sid');
        const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${resourceType}/${resourceId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...data
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            console.log(`updating personal user info failed`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/profile/${resourceType}`, "page")
        return responseObject;
        
    } catch (error) {
        console.error('Network error updating personal info:', error);
        return null        
    }    
}

export async function updatePassword(password){
    try {
        console.log('calling updatePassword fetch:', password)
        const allCookies = cookies();
        const connectSidCookie = allCookies.getAll('connect.sid');
        const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/mine`, {
            method: 'PATCH',
            body: JSON.stringify({
                ...password
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            console.log(`updating password failed`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('Network error updating password:', error);
        return null        
    } 

}


export async function addNewPersonalInfo(newdata, resourceType){
    try {
        console.log('calling addNewPersonalInfo fetch:', newdata, resourceType)
        const allCookies = cookies();
        const connectSidCookie = allCookies.getAll('connect.sid');
        const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${resourceType}`, {
            method: 'POST',
            body: JSON.stringify({
                ...newdata
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            console.log(`adding personal user info failed`, response);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/profile/${resourceType}`, "page")
        return responseObject;
        
    } catch (error) {
        console.error('Network error adding personal info:', error);
        return null        
    }
}


export async function deletePersonalInfo(resourceType,resourceId){
    try {
        const allCookies = cookies();
        const connectSidCookie = allCookies.getAll('connect.sid');
        const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${resourceType}/${resourceId}`, {
            method: 'DELETE',
            headers : {
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            console.log(`deleteing personal user info failed`);
        } 

        revalidatePath(`/account/profile/${resourceType}`, "page")
    
    } catch (error) {
        console.error('Network error deleting personal info:', error);
        return null        
    } 

}
