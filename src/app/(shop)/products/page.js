import styles from './page.module.css'
import ProductCard from '@/_components/_layout_components/ProductCard';
import { fetchAllProducts } from '@/_utilities/productRequests';
import { ChevronDown, LeafIcon } from '../../../../public/svgIcons';

export default async function AllProducts(){
    const data = await fetchAllProducts();
        
    return (
        <>
        { data.products_and_categories.length === 0 ? 
            <div className={styles.category_empty_container}>
                <p className={styles.category_empty_message}>{responseObject.error.message}</p>
                <LeafIcon width={150} height={150} weight={2}/>
                <p className={styles.category_empty_message}>Flowell</p>
            </div> :
            <>
            <section className={styles.main_container}>
                <h2>All Products <span>{data.products_and_categories[0].length} Results</span></h2>
                <div className={styles.filter_sort_buttons_container}>
                    <button className={styles.button_sort_and_filter}>Filter by</button>
                    <button className={styles.button_sort_and_filter}>Sort by  
                        <ChevronDown width={16} height={16} weight={3}/>
                    </button>
                </div>
            </section>
            <section className={styles.products_main_container}>
                {data.products_and_categories[0].map(product => (
                <ProductCard key={product.id} data={product} />
                ))}
            </section>
            </>
        }
        </>    
    );
}