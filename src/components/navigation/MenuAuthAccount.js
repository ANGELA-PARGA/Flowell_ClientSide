import Link from 'next/link';
import styles from './components.module.css'

const MenuAuthAccount = ({handleClose}) => {
    return (        
        <div className={styles.dropdown_menu_unauthenticated_options}>
            <ul>
                <li className={styles.dropdown_menu_unauthenticated_options_list}>
                    <Link href='/account/profile' onClick={()=> handleClose()}>Account</Link>
                </li>
                <li className={styles.dropdown_menu_unauthenticated_options_list}>
                    <Link href='/account/orders' onClick={()=> handleClose()}>Orders</Link>
                </li>
            </ul>
        </div> 
        
    );
};

export default MenuAuthAccount;