import styles from './page.module.css'
import ProductCard from '@/components/product/ProductCard';
import { ChevronDown } from '../../../../public/svgIcons';
import { Suspense } from 'react';
import { AllProductsFallback } from './AllProductsFallback';

export default async function SearchResults(){
    console.log('products info in SearchResults component')

        
    return (
        <>
        <section className={styles.main_container}>
            <h2>Search: <span>{data.products_and_categories[0].length} Results</span></h2>
            <div className={styles.filter_sort_buttons_container}>
                <button className={styles.button_sort_and_filter}>Filter by</button>
                <button className={styles.button_sort_and_filter}>Sort by  
                    <ChevronDown width={16} height={16} weight={3}/>
                </button>
            </div>
        </section>
        <Suspense fallback={<AllProductsFallback/>}>
            <section className={styles.products_main_container}>
                {data.map(product => (
                <ProductCard key={product.id} data={product} />
                ))}
            </section>
        </Suspense>
        </>   
    );
}