
export async function fetchAllProducts(page, filters ={}) {
    console.log('calling fetch all products:', page, filters)
    
    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch( `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?${query.toString()}`, { cache: 'force-cache'});

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching all products failed`, errorResponse);
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
    console.log('calling fetch product by id:', id)
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, { cache: 'force-cache'})

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching products by id`, errorResponse);
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
    console.log('calling fetch all products by category:', categoryId, page, filters)
    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories/${categoryId}?${query.toString()}`, { cache: 'force-cache'})

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching products by category id`, errorResponse);
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
    console.log(`calling fetch products by search`, term, filters);
    const query = new URLSearchParams({
        ...filters,
    });
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?term=${term}&${query.toString()}`, { cache: 'force-cache'})

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`search product by term failed`, errorResponse);
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
            console.log(`fetching categories`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const data = await response.json()
        return data;  

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

