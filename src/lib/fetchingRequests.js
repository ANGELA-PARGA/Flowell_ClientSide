
export async function fetchAllProducts(page, filters ={}) {

    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch( `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?${query.toString()}`, { cache: 'force-cache'});

        if (!response.ok) {        
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        }

        const responseObject = await response.json();
        return responseObject;
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
}


export async function fetchProductsById(id){    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, { cache: 'force-cache'})

        if (!response.ok) {        
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        return responseObject; 

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

export async function fetchProductsByCategory(categoryId, page, filters ={}){
    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories/${categoryId}?${query.toString()}`, { cache: 'force-cache'})

        if (!response.ok) {        
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const data = await response.json()
        return data;  

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}


export async function fetchProductsBySearch(term, filters ={}){
    const query = new URLSearchParams({
        ...filters,
    });
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?term=${term}&${query.toString()}`, { cache: 'force-cache'})

        if (!response.ok) {        
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const data = await response.json()
        return data;  

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}


export async function fetchCategories(){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories`, { cache: 'force-cache'})

        if (!response.ok) {        
            const errorResponse = await response.json();
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const data = await response.json()
        return data;  

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

