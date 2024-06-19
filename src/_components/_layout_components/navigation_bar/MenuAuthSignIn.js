import Link from 'next/link';
import styles from './components.module.css'

const MenuAuthSignIn = () => {
    return (        
        <div className={styles.dropdown_menu_unauthenticated_options}>
            <ul>
                <li className={styles.dropdown_menu_unauthenticated_options_list}>
                    <Link href='/account/profile/personal_inf'>Account information</Link>
                </li>
                <li className={styles.dropdown_menu_unauthenticated_options_list}>
                    <Link href='/account/orders'>Orders</Link>
                </li>
            </ul>
        </div> 
        
    );
};

export default MenuAuthSignIn;