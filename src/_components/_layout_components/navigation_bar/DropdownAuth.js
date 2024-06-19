import Link from 'next/link';
import styles from './components.module.css'

const DropdownAuth = ({linkActive}) => {

    if(linkActive === 'sign_in'){
        return (
            <div className={styles.dropdown_menu_unauthenticated}>
                <div className={styles.dropdown_menu_unauthenticated_options}>
                    <p>Access to your account and orders</p>
                    <div>
                        <Link href='/login'><button className={styles.button_sign_in}>Sign In</button></Link>
                    </div>
                </div>                  
                <div className={styles.dropdown_menu_unauthenticated_options}>
                    <p>Not a member yet?</p>
                    <ul>
                        <li className={styles.dropdown_menu_unauthenticated_options_list}>
                            <Link href='/register'>Register here</Link>
                        </li>
                    </ul>
                </div>  
            </div>
        );
    }

    if(linkActive === 'cart'){
        return (
            <div className={styles.dropdown_menu_unauthenticated}>
                <div className={styles.dropdown_menu_unauthenticated_options}>
                    <p>Access to your account and cart</p>
                    <div>
                        <Link href='/login'><button className={styles.button_sign_in}>Sign In</button></Link>
                    </div>
                </div>   
            </div>
        );
    }

    if(linkActive === 'auth'){
        return (
            <div className={`${styles.dropdown_menu_unauthenticated} ${styles.dropdown_menu_unauthenticated_phone}`}>
                <div className={styles.dropdown_menu_unauthenticated_options}>
                    <p>Access to your account</p>
                    <div>
                        <Link href='/login'><button className={styles.button_sign_in}>Sign In</button></Link>
                    </div>                    
                </div>                  
                <div className={styles.dropdown_menu_unauthenticated_options}>
                    <p>Not a member yet?</p>
                    <div>
                        <Link href='/register'><button className={styles.button_sign_up}>Sign Up</button></Link>
                    </div>
                </div>
                <div className={styles.dropdown_menu_unauthenticated_options}>
                    <p>Check nothing's left behind!</p>
                    <div>
                        <Link href='/login'><button className={styles.button_cart}>Cart</button></Link>
                    </div>
                </div>  
            </div>
        );
    }

};

export default DropdownAuth;