import styles from './components.module.css'
import Image from 'next/image'
import UpdateCartItems from '../forms/UpdateCartItems'


const ProductCartMenu = ({data, id}) => {

    return (
    <div className={styles.product_cart_menu_container}>
            <div className={styles.product_cart_small_img_menu}>
                <Image src={data.images[0]}
                    width={80}
                    height={80}
                    style={{                        
                        borderRadius: '5%'
                    }}
                    alt={`Picture of ${data.name}`}>
                </Image>
            </div>
            <div className={styles.product_cart_details_info}>
                <div className={styles.productNameCartMenu}><p>{data.name}</p></div>
                <div><span className={styles.productSubtotalCartMenu}>${data.price_per_case.toFixed(2)}</span></div>
            </div>
            <UpdateCartItems data={data} id={id} key={id}/>
        </div>      
    )
}

export default ProductCartMenu