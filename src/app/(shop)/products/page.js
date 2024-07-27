import styles from './page.module.css'
import ProductCard from '@/components/product/ProductCard';
import { fetchAllProducts } from '@/lib/fetchingRequests';
import { ChevronDown } from '../../../../public/svgIcons';
import { Suspense } from 'react';
import LoadMore from '@/UI/LoadMore';
import PaginationButton from '@/UI/PaginationButton';


export default async function AllProducts({searchParams}){
    const page = Number(searchParams?.p) || 1;

    const data = await fetchAllProducts(page);

    const pages = data.pagination.totalPages
    console.log('all products info in AllProducts component', data, pages) 
        
    return (
        <>
            <section className={styles.main_container}>
                <h2>All Products <span>{data.products_and_categories[0].length} Results</span></h2>
                <div className={styles.filter_sort_buttons_container}>
                    <button className={styles.button_sort_and_filter}>Filter by</button>
                    <button className={styles.button_sort_and_filter}>Sort by  
                        <ChevronDown width={16} height={16} weight={3}/>
                    </button>
                </div>                
                <section className={styles.products_main_container}>
                    <Suspense key={`products_${page}p`} fallback={<LoadMore/>}>
                        {data.products_and_categories[0].map(product => (                        
                            <ProductCard key={product.id} data={product} />                       
                        ))}
                    </Suspense>
                </section>                
                <div className={styles.paginationContainer}>
                    {Array.from({ length: pages }, (_, index) => (
                        <PaginationButton key={index + 1} number={index + 1} url={`?p=${index + 1}`} />
                    ))}                    
                </div>
            </section>                 
        </>   
    );
}