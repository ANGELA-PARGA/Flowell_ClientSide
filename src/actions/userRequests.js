'use server'
require('dotenv').config({ path: 'api.env' });
import { revalidatePath } from 'next/cache';
import { cookies } from "next/headers";

/*it requires an url param string indicating the resourceType and an ID param indicating the resource to update */
export async function updatePersonalInfo(data, resourceType, resourceId){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        console.log('calling updatePersonalInfo fetch:', data, resourceType, resourceId)
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
            console.log(`updating personal user info failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/profile/${resourceType}`, "page")
        return responseObject;
        
    } catch (error) {
        console.error('Network error updating personal info:', error);
        throw error;        
    }    
}

export async function updatePassword(password){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        console.log('calling updatePassword fetch:', password)
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
            console.log(`updating password info failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('Network error updating password:', error);
        throw error;        
    } 
}


export async function addNewPersonalInfo(newdata, resourceType){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        console.log('calling addNewPersonalInfo fetch:', newdata, resourceType)
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
            console.log(`adding personal user info failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/profile/${resourceType}`, "page")
        return responseObject
        
    } catch (error) {
        console.error('Network error adding personal info:', error);
        throw error;       
    }
}


export async function deletePersonalInfo(resourceType,resourceId){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        console.log('calling deletePersonalInfo fetch:', resourceType, resourceId)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${resourceType}/${resourceId}`, {
            method: 'DELETE',
            headers : {
                cookie: cookieForServer
            }
        })

        if (!response.ok) {       
            const errorResponse = await response.json();
            console.log(`deleting personal user info failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        revalidatePath(`/account/profile/${resourceType}`, "page")
    
    } catch (error) {
        console.error('Network error deleting personal info:', error);
        throw error;       
    } 

}
