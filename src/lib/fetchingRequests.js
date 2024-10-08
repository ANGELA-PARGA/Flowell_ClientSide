
export async function fetchAllProducts(page){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?page=${page}`, { next: { revalidate: 600 } }) 

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching all products failed`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, { cache: 'no-store'})

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching products by id`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories/${categoryId}`, { next: { revalidate: 600 } })

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching products by category id`, errorResponse);
            throw new Error(`Error ${errorResponse.status}: ${errorResponse?.customError?.message || errorResponse.error}`);
        } 

        const data = await response.json()
        return data;  

    } catch (error) {
        console.error('Network error:', error);
        throw error
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

