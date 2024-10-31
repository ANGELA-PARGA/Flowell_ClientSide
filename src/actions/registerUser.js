
export async function registerUser(data){
    console.log('REGISTER NEW USER FETCH:', data)
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
            console.log(`REGISTERING NEW USER FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 
        const responseObject = await response.json()
        console.log('REGISTER NEW USER RESPONSE:', responseObject)
        return responseObject;

    } catch (error) {
        console.error('NETWORK ERROR REGISTERING NEW USER:', error);
        throw error
    }
}