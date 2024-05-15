'use client'
import Link from 'next/link';
import styles from './components.module.css'
import Image from 'next/image';
import mini_image1 from '../../../public/mini_image1.jpeg'

const ProductCard = ({data}) => {

    return (
        <div className={styles.main_card_container}>            
            <div className={styles.image_card_container}>
                <Image  src={mini_image1}
                        sizes="100vw"
                        style={{
                            maxWidth: '100%',
                            minWidth: '200px',
                            height: 'auto',
                            borderRadius: '25%'
                        }}
                        priority
                        alt="Picture of the author"
                />
            </div>
            <div className={styles.product_card_info_container}>
                <div className={styles.product_card_title_container}>
                    <h1>{data.name}</h1>
                    <p id={styles.price_card_presentation}>${data.price_per_case}</p>
                </div> 
                <div className={styles.product_presentation_container}>
                        <h4>{data.measure_per_case} count: <span>{data.qty_per_case}</span></h4>
                        <h4>color variety: <span>{data.color}</span></h4>
                </div>                                    
                <Link href={`/products/${data.id}`}><button className={styles.view_product_button}>View</button></Link>      
            </div>
        </div>
    )
};

export default ProductCard;