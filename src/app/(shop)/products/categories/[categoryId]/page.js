import styles from './page.module.css'
import ProductCard from '@/components/product/ProductCard';
import { fetchProductsByCategory } from '@/lib/fetchingRequests';
import { Suspense } from 'react';
import LoadMore from '@/UI/LoadMore';
import { AddColorFilter } from '@/components/product/AddFilters';
import PaginationButton from '@/UI/PaginationButton';

export default async function CategoryProducts({params, searchParams}){
  const page = Number(searchParams?.p) || 1;
  const colorFilter = searchParams?.color || [];
  const data = await fetchProductsByCategory(params.categoryId, page, { color: colorFilter}); 
  const pages = data.pagination.totalPages
  const totalProducts = data.pagination.totalProducts
  
  return (
    <>
    { data.products_by_category.length === 0 ?
        <section className={styles.main_container}>
          <h2>Found: <span>0 Results</span></h2>
          <AddColorFilter/>
          <h3>Products not found, clear some filters and try again</h3>
        </section> 
        : 
        <section className={styles.main_container}>
          <h2>All {data.products_by_category[0].category_name} <span>{totalProducts} Results</span></h2>
          <AddColorFilter/>
          <section className={styles.products_main_container}>
            <Suspense key={`category_${params.categoryId}`} fallback={<LoadMore/>}>          
                {data.products_by_category.map(product => (              
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
        }
    </>
  );
}
