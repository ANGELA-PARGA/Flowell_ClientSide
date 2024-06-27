'use server'
require('dotenv').config({ path: 'api.env' });

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache";


export async function fetchAllProducts(){
    try {
        console.log('calling fetch all products')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
        if (!response.ok) {        
            console.log(`fetch failed: ${response}`);
        } else {
            const responseObject = await response.json()
            return responseObject;
        }
    } catch (error) {
        console.error('Network error:', error);
        return null
    }
}

export async function fetchProductsById(id){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`)
        if (!response.ok) {        
            console.log(`fetch failed: ${response}`);
        } 
        const data = await response.json()
        return data;        
    } catch (error) {
        console.error('Network error:', error);
        return null
    }
}

export async function fetchProductsByCategory(categoryId){
    try {
        console.log('calling fetch products by category:', categoryId)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories/${categoryId}`)
        if (!response.ok) {        
            console.log(`fetch failed: ${response}`);
        } 
        const data = await response.json()
        return data;        
    } catch (error) {
        console.error('Network error:', error);
        return null
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
            console.log(` add item in cart fetch failed`);
        }
        const responseObject = await response.json()
        console.log(responseObject)
        revalidatePath(`/account/cart`, "page")
        return responseObject;        
    } catch (error) {
        console.error('Network error:', error);
        return null        
    }

}

export async function fetchProductsBySearch(term){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?term=${term}`)
        if (!response.ok) {        
            console.log(`fetch products by term failed: ${response}`);
        } 
        const data = await response.json()
        console.log('data received', data)
        return data;        
    } catch (error) {
        console.error('Network error:', error);
        return null
    }
}
