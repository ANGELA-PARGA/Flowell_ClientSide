import styles from '../page.module.css'
import ProductCard from '@/components/product/ProductCard';
import { Suspense } from 'react';
import { fetchProductsBySearch } from '@/lib/fetchingRequests';
import { AddAllFilters } from '@/components/product/AddFilters';
import LoadMore from '@/UI/LoadMore';

export default async function SearchResults({searchParams}){
    const colorFilter = searchParams?.color || [];
    const categoryFilter = searchParams?.category || [];
    const data = await fetchProductsBySearch(searchParams.t, { color: colorFilter, category: categoryFilter }); 
    const results = data.product_found

        
    return (
        <section className={styles.main_container}>
            <h2>Search: <span>{data.product_found.length} Results</span></h2>
            <AddAllFilters/>
            <section className={styles.products_main_container}>
                <Suspense key={searchParams.t} fallback={<LoadMore/>}>
                    { results.length > 0 ? (
                        results.map(product => (
                            <ProductCard key={product.id} data={product} />
                        ))                    
                    ) : (
                        <h3>Products not found, try another search or clear the filters!</h3>
                    )}
                </Suspense>
            </section>
        </section> 
    );
}