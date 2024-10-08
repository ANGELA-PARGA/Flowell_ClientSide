import styles from './components.module.css'
import Image from 'next/image';

const ProductCheckoutInfo = ({data}) => {
    return (
        <div className={styles.product_cart_maincontainer}>
            <div className={styles.product_cart_small_img}>
                <Image src={data.images[0]}
                    width= {150}
                    height= {150}
                    style={{
                        borderRadius: '5%'
                    }}
                    priority
                    alt={`mini image of the product ${data.name}`}>
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