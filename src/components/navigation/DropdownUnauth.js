import Link from 'next/link';
import styles from './components.module.css'

const DropdownUnauth = ({linkActive, handleClose}) => {

    if(linkActive === 'sign_in'){
        return (
            <div className={styles.dropdown_menu_unauthenticated}>
                <div className={styles.unauthenticated_options}>
                    <p>Access to your account and orders</p>
                    <div>
                        <Link href='/login' onClick={()=> handleClose()}><button className={styles.btn_signin}>Log In</button></Link>
                    </div>
                </div>                  
                <div className={styles.unauthenticated_options}>
                    <p>Not a member yet?</p>
                    <ul>
                        <li className={styles.unauthenticated_options_list}>
                            <Link href='/register' onClick={()=> handleClose()}>Register here</Link>
                        </li>
                    </ul>
                </div>  
            </div>
        );
    }

    if(linkActive === 'cart'){
        return (
            <div className={styles.dropdown_menu_unauthenticated}>
                <div className={styles.unauthenticated_options}>
                    <p>Access to your account and cart</p>
                    <div>
                        <Link href='/login' onClick={()=> handleClose()}><button className={styles.btn_signin}>Sign In</button></Link>
                    </div>
                </div>   
            </div>
        );
    }

};

export default DropdownUnauth;