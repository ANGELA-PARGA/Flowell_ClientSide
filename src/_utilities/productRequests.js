export async function fetchAllProducts(){
    try {
        console.log('calling fetch all products')
        const response = await fetch(`http://localhost:8000/api/products`)
        if (!response.ok) {        
            console.log(`fetch failed: ${response}`);
            return null
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
        const response = await fetch(`http://localhost:8000/api/products/${id}`)
        if (!response.ok) {        
            console.log(`fetch failed: ${response}`);
            return null
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
        const response = await fetch(`http://localhost:8000/api/products/categories/${categoryId}`)
        if (!response.ok) {        
            console.log(`fetch failed: ${response}`);
            return null;
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
