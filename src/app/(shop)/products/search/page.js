import styles from '../page.module.css'
import ProductCard from '@/components/product/ProductCard';
import { ChevronDown } from '../../../../../public/svgIcons';
import { Suspense } from 'react';
import { fetchProductsBySearch } from '@/lib/fetchingRequests';
import LoadMore from '@/UI/LoadMore';

export default async function SearchResults({searchParams}){
    const data = await fetchProductsBySearch(searchParams.t)
    const results = data.product_found

        
    return (
        <section className={styles.main_container}>
            <h2>Search: <span>{data.product_found.length} Results</span></h2>
            <div className={styles.filter_sort_buttons_container}>
                <button className={styles.button_sort_and_filter}>Filter by</button>
                <button className={styles.button_sort_and_filter}>Sort by  
                    <ChevronDown width={16} height={16} weight={3}/>
                </button>
            </div>
            <section className={styles.products_main_container}>
                <Suspense key={searchParams.t} fallback={<LoadMore/>}>
                    { results.length > 0 ? (
                        results.map(product => (
                            <ProductCard key={product.id} data={product} />
                        ))                    
                    ) : (
                        <p>Products not found, try another search!</p>
                    )}
                </Suspense>
            </section>
        </section> 
    );
}