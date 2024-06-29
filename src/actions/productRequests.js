'use server'
require('dotenv').config({ path: 'api.env' });

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache";


export async function fetchAllProducts(){
    try {
        console.log('calling fetch all products')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching all products failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse.customError.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        return responseObject;        
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
}

export async function fetchProductsById(id){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`)

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching products by id`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse.customError.message || errorResponse.error}`);
        } 

        const responseObject = await response.json()
        return responseObject; 

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

export async function fetchProductsByCategory(categoryId){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories/${categoryId}`)

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching products by category id`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse.customError.message || errorResponse.error}`);
        } 

        const data = await response.json()
        return data;  

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

export async function addProductToCart({product_id, qty}){
    try {
        console.log('add to cart item fetch:', {product_id, qty})
        const allCookies = cookies();
        const connectSidCookie = allCookies.getAll('connect.sid');
        const cookieForServer = `${connectSidCookie[0].name}=${connectSidCookie[0].value}`

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
            throw new Error(`Error ${errorResponse.status}: ${errorResponse.customError.message || errorResponse.error}`);
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
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?term=${term}`)

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`search product by term failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse.customError.message || errorResponse.error}`);
        } 

        const data = await response.json()
        return data;  

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}
