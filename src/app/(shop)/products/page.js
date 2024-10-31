import styles from './page.module.css'
import ProductCard from '@/components/product/ProductCard';
import { fetchAllProducts } from '@/lib/fetchingRequests';
import { AddAllFilters } from '@/components/product/AddFilters';
import { Suspense } from 'react';
import LoadMore from '@/UI/LoadMore';
import PaginationButton from '@/UI/PaginationButton';

/*The component uses searchParams to apply pagination and filters (color, category) 
the number of pages is determined by the backend*/
export default async function AllProducts({searchParams}){
    const page = Number(searchParams?.p) || 1;
    const colorFilter = searchParams?.color || []; 
    const categoryFilter = searchParams?.category || [];

    const data = await fetchAllProducts(page, { color: colorFilter, category: categoryFilter });
    const pages = data.pagination.totalPages
    const totalProducts = data.pagination.totalProducts

    return (
        <>
            <section className={styles.main_container}>
                <h2>All Products: <span>{totalProducts} Results</span></h2>
                <AddAllFilters/>
                { data.products_and_categories.length === 0 && 
                    <h3>Products not found, clear some filters and try again!</h3>
                }
                <section className={styles.products_main_container}>
                    <Suspense key={`products_${page}p`} fallback={<LoadMore/>}>
                        {data.products_and_categories.map(product => (                        
                            <ProductCard key={product.id} data={product} />                       
                        ))}
                    </Suspense>
                </section>                
                <div className={styles.paginationContainer}>
                    {Array.from({ length: pages }, (_, index) => (
                        <PaginationButton key={index + 1} number={index + 1} />
                    ))}                    
                </div>
            </section>                 
        </>   
    );
}