import Link from 'next/link';
import styles from './components.module.css'
import { UserIcon, OrdersIcon, CartIcon } from '../../../../public/svgIcons';

const MenuAuthPhone = () => {
    return (
        <div>
            <div className={styles.dropdown_menu_unauthenticated_options}>    
                <UserIcon width={28} height={28} weight={2} />
                <Link href='/account/profile/personal_inf'><button className={styles.button_sign_in}>Account</button></Link>                       
            </div>                  
            <div className={styles.dropdown_menu_unauthenticated_options}>               
                <OrdersIcon width={28} height={28} weight={2}/>
                <Link href='/account/orders'><button className={styles.button_sign_up}>Orders</button></Link>    
            </div>
            <div className={styles.dropdown_menu_unauthenticated_options}>
                <CartIcon width={28} height={28} weight={2}/>
                <Link href='/account/cart'><button className={styles.button_cart}>Cart</button></Link>
            </div>
        </div>
    );
};

export default MenuAuthPhone;