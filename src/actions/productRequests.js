'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addProductToCart({product_id, qty}){
    console.log('ADD TO CART ITEM:', {product_id, qty})
    const allCookies = cookies();
    const connectSidCookie = allCookies.getAll('connect.sid');
    const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`
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
            const errorResponse = await response.json();
            console.log(`ADDING ITEM TO CART FAILED`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        }

        const responseObject = await response.json()
        revalidatePath(`/account/cart`, "page")
        return responseObject;   
            
    } catch (error) {
        console.error('NETWORK ERROR ADDING ITEM TO CART:', error);
        throw error;       
    }

}

export async function fetchProductsBySearch(term){
    console.log(`FETCHING PRODUCTS BY SEARCH`, term);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?term=${term}`)

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`SEARCH PRODUCT BY TERM FAILED:`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const data = await response.json()
        return data;  

    } catch (error) {
        console.error('NETWORK ERROR SEARCHING PRODUCTS:', error);
        throw error
    }
}