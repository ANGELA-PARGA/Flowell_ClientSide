'use client'

import Link from 'next/link';
import styles from './components.module.css'
import { StoreContext } from '@/context';
import { useContext } from 'react';


const MenuAuthCart = () => {
    const {cartData} = useContext(StoreContext);

    return (
        cartData.total_items > 0 ? 
            <div className={styles.dropdown_menu_authenticated}>
                <div className={styles.dropdown_menu_unauthenticated_options}>
                    <p>You have {cartData.total_items} items on your cart</p>
                    <div>
                        <Link href='/account/cart'><button className={styles.button_sign_in}>View cart</button></Link>
                    </div>
                </div>   
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