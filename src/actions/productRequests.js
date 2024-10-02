'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addProductToCart({product_id, qty}){
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
    try {
        console.log('add to cart item fetch:', {product_id, qty})
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
            const errorResponse = await response.json();
            console.log(`adding item in cart fetch failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        }

        const responseObject = await response.json()
        revalidatePath(`/account/cart`, "page")
        return responseObject;   
            
    } catch (error) {
        console.error('Network error:', error);
        throw error;       
    }

}

export async function fetchProductsBySearch(term){
    console.log(`calling fetch products by search`, term);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?term=${term}`)

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`search product by term failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const data = await response.json()
        return data;  

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}