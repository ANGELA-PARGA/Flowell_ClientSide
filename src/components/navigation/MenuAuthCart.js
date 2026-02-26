'use client'

import Link from 'next/link';
import styles from './components.module.css'
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '@/store/cart/selectors';
import ProductCartMenu from '../product/ProductCartMenu';

const MenuAuthCart = ({handleClose}) => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
        cartTotal ? 
                <div className={`${styles.dropdown_menu_authenticated} flex-col-gap-xl ${styles.dropdown_menu_authenticated_cart}`}>                
            {
                <>                    
                {cartItems.map((item) => (
                    <ProductCartMenu data={item} id={item.product_id} key={item.product_id} />          
                ))}                    
                <h3 className={styles.dropdown_total_cart}>Total: ${cartTotal.toFixed(2)}</h3>
                <div>
                    <Link href='/account/cart' onClick={()=> handleClose()}><button className='btn_primary_standard btn_sizeS'>View</button></Link>
                </div>
                </>
            }
            </div> :
            <div className={`${styles.dropdown_menu_unauthenticated} flex-col-gap-xl`}>
                <div className={styles.unauthenticated_options}>
                    <p>Your cart is empty</p>
                    <div>
                        <Link href='/account/cart' onClick={()=> handleClose()}><button className='btn_primary_standard btn_sizeS'>View cart</button></Link>
                    </div>
                </div>   
            </div>
        
    );
};

export default MenuAuthCart;