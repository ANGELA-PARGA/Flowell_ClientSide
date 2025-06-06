import styles from './page.module.css'
import ProductCard from '@/components/product/ProductCard';
import { fetchAllProducts } from '@/lib/fetchingRequests';
import { AddAllFilters } from '@/components/product/AddFilters';
import PaginationButton from '@/UI/PaginationButton';
import { Suspense } from 'react';
import LoadingAllProducts from '@/UI/LoadingAllProducts';

/*The component uses searchParams to apply pagination and filters (color, category) 
the number of pages is determined by the backend*/
export const revalidate = 3600

export default async function AllProducts(props) {

    const searchParams = await props.searchParams;
    const page = Number(searchParams?.p) || 1;
    const colorFilter = searchParams?.color || [];
    const categoryFilter = searchParams?.category || [];

    const data = await fetchAllProducts(page, { color: colorFilter, category: categoryFilter });
    const pages = data.pagination.totalPages
    const totalProducts = data.pagination.totalProducts

    return (
        <Suspense fallback={<LoadingAllProducts/>}>
            <section className={styles.main_container}>
                <h2>All Products: <span>{totalProducts} Results</span></h2>
                <AddAllFilters/>
                { data.products_and_categories.length === 0 && 
                    <h3>Products not found, clear some filters and try again!</h3>
                }
                <section className={styles.products_main_container}>                    
                    {data.products_and_categories.map(product => (                        
                        <ProductCard key={product.id} data={product} />                       
                    ))}                    
                </section>                
                <div className={styles.paginationContainer}>
                    {Array.from({ length: pages }, (_, index) => (
                        <PaginationButton key={index + 1} number={index + 1} />
                    ))}                    
                </div>
            </section>                 
        </Suspense>   
    );
}