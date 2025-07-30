import Link from 'next/link';
import styles from './components.module.css'

const DropdownUnauth = ({linkActive, handleClose}) => {

    if(linkActive === 'sign_in'){
        return (
            <div className={`${styles.dropdown_menu_unauthenticated} flex-col-gap-xl`}>
                <div className={`${styles.unauthenticated_options} flex-col-gap-xl`}>
                    <p>Access to your account and orders</p>
                    <div>
                        <Link href='/login' onClick={()=> handleClose()}><button className='btn_primary_standard btn_sizeS'>Log In</button></Link>
                    </div>
                </div>                  
                <div className={`${styles.unauthenticated_options} flex-col-gap-xl`}>
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
            <div className={`${styles.dropdown_menu_unauthenticated} flex-col-gap-xl`}>
                <div className={styles.unauthenticated_options}>
                    <p>Access to your account and cart</p>
                    <div>
                        <Link href='/login' onClick={()=> handleClose()}><button className='btn_primary_standard btn_sizeS'>Sign In</button></Link>
                    </div>
                </div>   
            </div>
        );
    }

};

export default DropdownUnauth;