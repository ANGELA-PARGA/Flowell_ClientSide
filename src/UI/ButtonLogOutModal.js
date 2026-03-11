'use client'

import styles from './components.module.css'
import { executeLogout } from '@/lib/clientLogout';


export default function ButtonLogOutModal({ handleClose }) {

    const onClickLogOut = async () => {        
        try {
            await executeLogout({
                callbackUrl: '/login',
                onBeforeSignOut: () => {
                    handleClose();
                },
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button 
            className={`${styles.button_sign_in_modal} btn_primary_standard btn_sizeS`} 
            onClick={onClickLogOut}
        >
            Login
        </button>
    );
}
