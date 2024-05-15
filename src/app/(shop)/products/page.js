import styles from './page.module.css'
import ProductCard from '@/_components/_layout_components/ProductCard';
import { fetchAllProducts } from '@/_utilities/productRequests';

export default async function AllProducts(){
    const data = await fetchAllProducts();

    return (
        <>
        { data.products_and_categories.length === 0 ? 
            <div className={styles.category_empty_container}>
                <p className={styles.category_empty_message}>{responseObject.error.message}</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-leaf" width="150" height="150" viewBox="0 0 24 24" strokeWidth="2" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" />
                </svg>
                <p className={styles.category_empty_message}>Flowell</p>
            </div> :
            <>
            <section className={styles.main_container}>
                <h2>All Products <span>{data.length} Results</span></h2>
                <div className={styles.filter_sort_buttons_container}>
                    <button className={styles.button_sort_and_filter}>Filter by</button>
                    <button className={styles.button_sort_and_filter}>Sort by  
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="16" height="16" viewBox="0 0 24 24" strokeWidth="3" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 9l6 6l6 -6" />
                        </svg>
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