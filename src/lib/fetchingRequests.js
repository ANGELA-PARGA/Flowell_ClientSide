/*Cache no-store to avoid using stale data, change on built*/
export async function fetchAllProducts(page, filters ={}) {
    console.log('calling fetch all products:', page, filters)
    const query = new URLSearchParams({
        page,
        ...filters,
    });

    try {
        const response = await fetch( `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?${query.toString()}`, { cache: 'force-cache', next: { revalidate: 1800 }});

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`, { cache: 'force-cache', next: { revalidate: 1800 }})

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching products by id`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const responseObject = await response.json()
        console.log(`fetching products by id RESPONSE:`, responseObject);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/categories/${categoryId}?${query.toString()}`, { cache: 'force-cache', next: { revalidate: 1800 }})

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`fetching products by category id`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const data = await response.json()
        console.log('all products by category RESPONSE:', data)
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search?term=${term}&${query.toString()}`, { cache: 'no-store'})

        if (!response.ok) {        
            const errorResponse = await response.json();
            console.log(`search product by term failed`, errorResponse);
            throw new Error(`Error: ${errorResponse.status}, ${errorResponse.error}, statusCode: ${errorResponse?.customError.status}`);
        } 

        const data = await response.json()
        console.log(`fetch products by search response:`, data);
        return data;  

    } catch (error) {
        console.error('Network error:', error);
        throw error
    }
}

