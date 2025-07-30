import styles from './components.module.css'
import ButtonLogOut from '../../UI/ButtonLogOut';
import MenuAuthAccount from './MenuAuthAccount';
import MenuAuthCart from './MenuAuthCart';

const DropdownAuthUser = ({linkActive, handleClose}) => {

    if(linkActive === 'sign_in'){
        return (
            <div className={`${styles.dropdown_menu_authenticated} flex-col-gap-xl`}>
                <MenuAuthAccount handleClose={handleClose}/>
                <ButtonLogOut/>          
            </div>
        );
    }

    if(linkActive === 'cart'){
        return (
            <div>
                <MenuAuthCart handleClose={handleClose}/>                        
            </div>
        );
    }

};

export default DropdownAuthUser;