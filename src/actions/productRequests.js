'use server'

import { revalidatePath } from "next/cache";
import { cookieFetchVerification } from "@/lib/cookieVerification";

export async function addProductToCart({product_id, qty}){
    console.log('ADD TO CART ITEM:', {product_id, qty})
    const { cookieForServer, expired } = await cookieFetchVerification();

    if (expired) {
        console.log('Session expired on the backend. Triggering logout.');
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
                console.log('Session expired on the backend. Triggering logout.');
                return { expired: true };
            }       
            const errorResponse = await response.json();
            console.log(`ADDING ITEM TO CART FAILED`, errorResponse);
            throw new Error(`Error: ${errorResponse?.customError?.message || errorResponse.error}`);
        }

        const responseObject = await response.json()
        revalidatePath(`/account/cart`, "page")
        return { data: responseObject, expired: false };  
            
    } catch (error) {
        console.error('NETWORK ERROR ADDING ITEM TO CART:', error);
        throw error;       
    }

}
