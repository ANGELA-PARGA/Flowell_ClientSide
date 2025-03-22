
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
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 
        const responseObject = await response.json()
        return responseObject;

    } catch (error) {
        console.error('NETWORK ERROR REGISTERING NEW USER:', error);
        throw error
    }
}