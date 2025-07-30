import styles from './components.module.css'
import AddToCart from '../forms/AddToCart';
import ProductImages from './ProductImages';
import { fetchProductsById } from '@/lib/fetchingRequests';
import { notFound } from 'next/navigation';

const ProductInfo = async ({id}) => {
    const data = await fetchProductsById(id);

    return (
        data.product_found.length === 0 ? 
            notFound()
        :        
        <div className={styles.main_info_container}>            
            <ProductImages images={data.product_found.images_urls} />
            <div className='flex-col-gap-md'>
                <div className={styles.product_title_container}>
                    <h1>{data.product_found.name}</h1>
                    <p id={styles.price_presentation}>${data.product_found.price_per_case.toFixed(2)}</p>
                    <br />
                    <p>{data.product_found.description}</p>
                </div> 
                <div className={`${styles.product_presentation_container} flex-col-gap-sm`}>
                        <p>{data.product_found.measure_per_case} count: {data.product_found.qty_per_case}</p>
                        <p>Color variety: {data.product_found.color}</p>
                </div>                                    
                <div>
                    <h3>Characteristics</h3>
                    <p>Remember: color shades variations are present, flowers are product of mother nature</p>
                    <br />
                    <ul className='flex-col-gap-sm'>
                        <li className={styles.details_container}>
                            <p>Stem length: {data.product_found.stem_length_cm} cm</p>
                        </li>
                        <li className={styles.details_container}>
                            <p>Lasting life: {data.product_found.life_in_days-3} to {data.product_found.life_in_days} days</p>
                        </li>
                        <li className={styles.details_container}>
                            <p>Blooms per stem: {data.product_found.blooms_per_stem}</p>
                        </li>
                        <li className={styles.details_container}>
                            <p>Blooms size: {data.product_found.bloom_size_cm-0.5} to {data.product_found.bloom_size_cm+0.5} cm</p>
                        </li>
                    </ul>
                </div> 
                <AddToCart id={id}/>                   
            </div>
        </div>
    )

};

export default ProductInfo;