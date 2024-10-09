'use server'

import { revalidatePath } from 'next/cache';
import { cookies } from "next/headers";

/*it requires an url param string indicating the resourceType and an ID param indicating the resource to update */
export async function updatePersonalInfo(data, resourceType, resourceId){
    console.log('UPDATING PERSONAL INFO FETCH:', data, resourceType, resourceId)
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
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
            const errorResponse = await response.json();
            console.log(`UPDATING PERSONAL INFO FAILED:`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/profile`, "page")
        return responseObject;
        
    } catch (error) {
        console.error('NETWORK ERROR UPDATING PERSONAL INFO:', error);
        throw error;        
    }    
}

export async function updatePassword(password){
    console.log('UPDATING PASSWORD FETCH:', password)
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
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
            const errorResponse = await response.json();
            console.log(`UPDATING PASSWORD FAILED:`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('NETWORK ERROR UPDATING PASSWORD:', error);
        throw error;        
    } 
}


export async function addNewPersonalInfo(newdata, resourceType){
    console.log('ADDING NEW PERSONAL INFO FETCH:', newdata, resourceType)
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
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
            const errorResponse = await response.json();
            console.log(`ADDING NEW PERSONAL INFO FAILED:`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/profile`, "page")
        return responseObject
        
    } catch (error) {
        console.error('NETWORK ERROR ADDING PERSONAL INFO:', error);
        throw error;       
    }
}


export async function deletePersonalInfo(resourceType,resourceId){
    console.log('DELETING PERSONAL INFO FETCH:', resourceType, resourceId)
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${resourceType}/${resourceId}`, {
            method: 'DELETE',
            headers : {
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            const errorResponse = await response.json();
            console.log(`DELETING PERSONAL INFO FAILED`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        revalidatePath(`/account/profile`, "page")
    
    } catch (error) {
        console.error('NETWORK ERROR DELETING PERSONAL INFO:', error);
        throw error;       
    } 

}
