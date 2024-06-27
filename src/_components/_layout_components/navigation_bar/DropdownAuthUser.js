import styles from './components.module.css'
import ButtonLogOut from '../../_elements/ButtonLogOut';
import MenuAuthAccount from './MenuAuthAccount';
import MenuAuthCart from './MenuAuthCart';

const DropdownAuthUser = ({linkActive}) => {

    if(linkActive === 'sign_in'){
        return (
            <div className={styles.dropdown_menu_authenticated}>
                <MenuAuthAccount/>
                <ButtonLogOut/>          
            </div>
        );
    }

    if(linkActive === 'cart'){
        return (
            <div>
                <MenuAuthCart />                        
            </div>
        );
    }

};

export default DropdownAuthUser;