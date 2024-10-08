import styles from './components.module.css'
import Image from 'next/image';
import UpdateCartItems from '../forms/UpdateCartItems';
import Link from 'next/link';

const ProductCartInfo = ({data, id}) => {

    return (
        <div className={styles.product_cart_maincontainer}>
            <div className={styles.product_cart_small_img}>
                <Image src={data.images[0]}
                    width={150}
                    height={150}
                    style={{
                        borderRadius: '5%'
                    }}
                    priority
                    alt={`mini image of ${data.name}`}>
                </Image>
            </div>
            <div className={styles.product_cart_details_info}>
                <div><Link href={`/products/${id}`}><p>{data.name}</p></Link></div>
                <div><span>${data.price_per_case.toFixed(2)}</span></div>
            </div>
            <UpdateCartItems data={data} id={id} key={id}/>
        </div>      
    )
};

export default ProductCartInfo;