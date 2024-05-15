'use server'
require('dotenv').config({ path: 'api.env' });

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

export async function addProductToCart(){

}
