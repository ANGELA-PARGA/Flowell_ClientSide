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
        if (response.ok) {   
            console.log(response);     
            console.log(`register successful with ${data}`);
        } else {
            console.log(response);
            console.error(`Login failed: ${error}`);
        }
    } catch (error) {
        console.error('Network error:', error);
        return null
    }
}