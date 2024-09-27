import styles from './components.module.css'
import Image from 'next/image';
import mini_image1 from '../../../public/mini_image1.jpeg'

const ProductCheckoutInfo = ({data}) => {
    return (
        <div className={styles.product_cart_maincontainer}>
            <div className={styles.product_cart_small_img}>
                <Image src={mini_image1}
                    sizes="100vw"
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '25%'
                    }}
                    priority
                    alt='mini image of the product in the cart'>
                </Image>
            </div>
            <div className={styles.product_cart_details_info}>
                <div><p>{data.name}</p></div>
                <div><span>${data.price_per_case.toFixed(2)}</span></div>
            </div>
            <div className={styles.product_cart_details_info}>
                <p>Qty: {data.qty}</p>
            </div>
            <div className={styles.product_cart_details_info}>
                <div><span>${(data.qty * data.price_per_case).toFixed(2)}</span></div>
            </div>
        </div>      
    )
};

export default ProductCheckoutInfo;