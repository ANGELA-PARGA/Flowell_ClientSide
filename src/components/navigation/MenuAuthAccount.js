import Link from 'next/link';
import styles from './components.module.css'

const MenuAuthAccount = ({handleClose}) => {
    return (        
        <div>
            <ul className={styles.dropdown_menu_authenticated_options}>
                <li >
                    <Link href='/account/profile' onClick={()=> handleClose()}>Account</Link>
                </li>
                <li>
                    <Link href='/account/orders' onClick={()=> handleClose()}>Orders</Link>
                </li>
            </ul>
        </div> 
        
    );
};

export default MenuAuthAccount;