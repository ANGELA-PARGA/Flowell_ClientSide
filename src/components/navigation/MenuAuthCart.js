'use client'

import Link from 'next/link';
import styles from './components.module.css'
import { StoreContext } from '@/context';
import { useContext } from 'react';
import ProductCartMenu from '../product/ProductCartMenu';

const MenuAuthCart = () => {
    const {cartData} = useContext(StoreContext);
    console.log(cartData)

    return (
        cartData.total_items > 0 ? 
            <div className={`${styles.dropdown_menu_authenticated} ${styles.dropdown_menu_authenticated_cart}`}>                
            {
                <>                    
                {cartData.items.map((item) => (
                    <ProductCartMenu data={item} id={item.product_id} key={item.product_id} />          
                ))}                    
                <h3 className={styles.dropdown_menu_total_cart}>Total: ${cartData.total.toFixed(2)}</h3>
                <div>
                    <Link href='/account/cart'><button className={styles.button_sign_in}>View</button></Link>
                </div>
                </>
            }
            </div> :
            <div className={styles.dropdown_menu_unauthenticated}>
                <div className={styles.dropdown_menu_unauthenticated_options}>
                    <p>Your cart is empty</p>
                    <div>
                        <Link href='/account/cart'><button className={styles.button_sign_in}>View cart</button></Link>
                    </div>
                </div>   
            </div>
        
    );
};

export default MenuAuthCart;