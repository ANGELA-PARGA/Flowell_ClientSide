'use server'
require('dotenv').config({ path: 'api.env' });


export async function registerUser(data){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {       
            const errorResponse = await response.json();
            console.log(`registering user failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse.customError.message || errorResponse.error}`);
        } 
        const responseObject = await response.json()
        return responseObject;

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}