'use server'

import { revalidatePath } from "next/cache";
import { cookieFetchVerification } from "@/lib/cookieVerification";

export async function addProductToCart({product_id, qty}){
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        return { expired: true };
    }
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
            method: 'POST',
            body: JSON.stringify({
                product_id,
                qty
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
        revalidatePath(`/account/cart`)
        return { data: responseObject, expired: false };  
            
    } catch (error) {
        console.error('NETWORK ERROR ADDING ITEM TO CART:', error);
        throw error;       
    }

}
