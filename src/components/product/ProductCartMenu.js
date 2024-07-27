import styles from './components.module.css'
import Image from 'next/image'
import UpdateCartItems from '../forms/UpdateCartItems'
import mini_image1 from '../../../public/mini_image1.jpeg'

const ProductCartMenu = ({data, id}) => {
    return (
    <div className={styles.product_cart_menu_container}>
            <div className={styles.product_cart_small_img}>
                <Image src={mini_image1}
                    sizes="100vw"
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '25%'
                    }}
                    alt='mini image of the product in the cart'>
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