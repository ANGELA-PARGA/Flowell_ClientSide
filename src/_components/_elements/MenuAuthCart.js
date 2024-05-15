'use client'

import Link from 'next/link';
import styles from '../_layout_components/components.module.css'

const MenuAuthCart = ({_cartItems}) => {
    return (
        _cartItems> 0 ? 
            <div className={styles.dropdown_menu_authenticated}>
                <div className={styles.dropdown_menu_unauthenticated_options}>
                    <p>You have {_cartItems} items on your cart</p>
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