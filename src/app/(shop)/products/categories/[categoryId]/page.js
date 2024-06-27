import styles from './page.module.css'
import ProductCard from '@/_components/_layout_components/ProductCard';
import { fetchProductsByCategory } from '@/actions/productRequests';
import { ChevronDown } from '../../../../../../public/svgIcons';
import { notFound } from 'next/navigation';

export default async function CategoryProducts({params}){
  const data = await fetchProductsByCategory(params.categoryId);
  
  return (
    <>
    { data.products_by_category.length === 0 ? 
        notFound() : 
        <>
        <section className={styles.main_container}>
          <h2>{data.products_by_category[0].category_name} <span>{data.products_by_category.length} Results</span></h2>
          <div className={styles.filter_sort_buttons_container}>
            <button className={styles.button_sort_and_filter}>Filter by</button>
            <button className={styles.button_sort_and_filter}>Sort by  
              <ChevronDown width={16} height={16} weight={3}/>
            </button>
          </div>
        </section>
        <section className={styles.products_main_container}>
          {data.products_by_category.map(product => (
            <ProductCard key={product.id} data={product} />
          ))}
        </section>
        </>}
    </>
  );
}
