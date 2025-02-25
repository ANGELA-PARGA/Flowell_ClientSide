'use server'

import { revalidatePath } from 'next/cache';
import { cookieFetchVerification } from '@/lib/cookieVerification';

export async function updatePersonalInfo(data, resourceType, resourceId){   
    console.log('CALLING UPDATE PERSONAL USER INFO:', data, resourceType, resourceId)
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }

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
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }      
            const errorResponse = await response.json();
            console.log(`UPDATING PERSONAL INFO FAILED:`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('UPDATE PERSONAL USER INFO RESPONSE:', responseObject)
        revalidatePath(`/account/profile`, "page")
        return { data: responseObject, expired: false };
        
    } catch (error) {
        console.error('NETWORK ERROR UPDATING PERSONAL INFO:', error);
        throw error;        
    }    
}

export async function updatePassword(password){
    console.log('UPDATING PASSWORD FETCH:', password)
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/mine`, {
            method: 'PATCH',
            body: JSON.stringify({
                password
            }),
            headers : {
                "Content-Type": "application/json",
                cookie: cookieForServer
            }
        })

        if (!response.ok) {  
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }     
            const errorResponse = await response.json();
            console.log(`UPDATING PASSWORD FAILED:`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('UPDATING PASSWORD RESPONSE:', responseObject)
        revalidatePath(`/account/profile`, "page")
        return { data: responseObject, expired: false };
        
    } catch (error) {
        console.error('NETWORK ERROR UPDATING PASSWORD:', error);
        throw error;        
    } 
}


export async function addNewPersonalInfo(newdata, resourceType){
    console.log('ADDING NEW PERSONAL INFO FETCH:', newdata, resourceType)
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }

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
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }       
            const errorResponse = await response.json();
            console.log(`ADDING NEW PERSONAL INFO FAILED:`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('ADDING NEW PERSONAL INFO RESPONSE:', responseObject)
        revalidatePath(`/account/profile`, "page")
        return { data: responseObject, expired: false };
        
    } catch (error) {
        console.error('NETWORK ERROR ADDING PERSONAL INFO:', error);
        throw error;       
    }
}


export async function deletePersonalInfo(resourceType,resourceId){
    console.log('CALLING DELETE PERSONAL USER INFO:', resourceType, resourceId)
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
        return { expired: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${resourceType}/${resourceId}`, {
            method: 'DELETE',
            headers : {
                cookie: cookieForServer
            }
        })

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }     
            const errorResponse = await response.json();
            console.log(`DELETING PERSONAL INFO FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        revalidatePath(`/account/profile`, "page")
    
    } catch (error) {
        console.error('NETWORK ERROR DELETING PERSONAL INFO:', error);
        throw error;       
    } 

}

export async function sentResetEmail(email){
    console.log('SENT RESET EMAIL FETCH:', email)    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/request_email_pwd_recovery`, {
            method: 'POST',
            body: JSON.stringify({
                ...email
            }),
            headers : {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {  
            console.log(response);     
            const errorResponse = await response.json();
            console.log(`SENDING EMAIL FOR RECOVERING PASSWORD FAILED:`, errorResponse);
            throw new Error(`Error: ${errorResponse?.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.errors[0].msg}`);
        } 

        const responseObject = await response.json()
        console.log('SENDING EMAIL FOR RECOVERING PASSWORD RESPONSE:', responseObject)
        return responseObject;
        
    } catch (error) {
        console.error('NETWORK ERROR SENDING EMAIL FOR RECOVERING PASSWORD:', error);
        throw error;        
    } 
}

export async function recoverPassword(data){
    console.log('RECOVERING PASSWORD:', data)

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset_password`, {
            method: 'PATCH',
            body: JSON.stringify({
                password: data.password,
                status: data.status                
            }),
            headers : {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {      
            const errorResponse = await response.json();
            console.log(`CHANGING PASSWORD FAILED:`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log('CHANGING PASSWORD RESPONSE:', responseObject)
        return responseObject;
        
    } catch (error) {
        console.error('NETWORK ERROR UPDATING PASSWORD:', error);
        throw error;        
    } 
}
