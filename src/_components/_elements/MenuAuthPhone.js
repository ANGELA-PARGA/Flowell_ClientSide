'use client'

import Link from 'next/link';
import styles from '../_layout_components/components.module.css'

const MenuAuthPhone = () => {
    return (
        <div>
            <div className={styles.dropdown_menu_unauthenticated_options}>
                <p>Your account</p>
                <div>
                    <Link href='/account/profile/personal_inf'><button className={styles.button_sign_in}>Account</button></Link>
                </div>                    
            </div>                  
            <div className={styles.dropdown_menu_unauthenticated_options}>
                <p>Your Orders</p>
                <div>
                    <Link href='/account/orders'><button className={styles.button_sign_up}>Orders</button></Link>
                </div>
            </div>
            <div className={styles.dropdown_menu_unauthenticated_options}>
                <p>Check nothing's left behind!</p>
                <div>
                    <Link href='/account/cart'><button className={styles.button_cart}>Cart</button></Link>
                </div>
            </div>
        </div>
    );
};

export default MenuAuthPhone;