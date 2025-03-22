'use server'

import { revalidatePath } from 'next/cache';
import { cookieFetchVerification } from '@/lib/cookieVerification';

export async function updatePersonalInfo(data, resourceType, resourceId){   
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
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
                return { expired: true };
            }      
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/profile`)
        return { data: responseObject, expired: false };
        
    } catch (error) {
        console.error('NETWORK ERROR UPDATING PERSONAL INFO:', error);
        throw error;        
    }    
}

export async function updatePassword(password){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
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
                return { expired: true };
            }     
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/profile`)
        return { data: responseObject, expired: false };
        
    } catch (error) {
        console.error('NETWORK ERROR UPDATING PASSWORD:', error);
        throw error;        
    } 
}


export async function addNewPersonalInfo(newdata, resourceType){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
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
                return { expired: true };
            }       
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        revalidatePath(`/account/profile`)
        return { data: responseObject, expired: false };
        
    } catch (error) {
        console.error('NETWORK ERROR ADDING PERSONAL INFO:', error);
        throw error;       
    }
}


export async function deletePersonalInfo(resourceType,resourceId){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
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
                return { expired: true };
            }     
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        revalidatePath(`/account/profile`)
    
    } catch (error) {
        console.error('NETWORK ERROR DELETING PERSONAL INFO:', error);
        throw error;       
    } 

}

export async function sentResetEmail(email){
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
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse?.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.errors[0].msg}`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('NETWORK ERROR SENDING EMAIL FOR RECOVERING PASSWORD:', error);
        throw error;        
    } 
}

export async function recoverPassword(data){

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
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        return responseObject;
        
    } catch (error) {
        console.error('NETWORK ERROR UPDATING PASSWORD:', error);
        throw error;        
    } 
}
