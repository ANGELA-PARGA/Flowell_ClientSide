import styles from './components.module.css'
import ButtonLogOut from '../_elements/ButtonLogOut';
import MenuAuthSignIn from '../_elements/MenuAuthSignIn';
import MenuAuthCart from '../_elements/MenuAuthCart';
import MenuAuthPhone from '../_elements/MenuAuthPhone';

const DropdownAuthUser = ({linkActive, _cartItems}) => {

    if(linkActive === 'sign_in'){
        return (
            <div className={styles.dropdown_menu_authenticated}>
                <MenuAuthSignIn/>
                <ButtonLogOut/>          
            </div>
        );
    }

    if(linkActive === 'cart'){
        return (
            <div>
                <MenuAuthCart _cartItems={_cartItems}/>                        
            </div>
        );
    }

    if(linkActive === 'auth'){
        return (
            <div className={`${styles.dropdown_menu_unauthenticated} ${styles.dropdown_menu_unauthenticated_phone}`}>
                <MenuAuthPhone/>
                <ButtonLogOut/>                 
            </div>
        );
    }

};

export default DropdownAuthUser;