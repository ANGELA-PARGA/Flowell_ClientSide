'use client'

import styles from './components.module.css'
import handleLogOut from '@/actions/logout'
import { signOut } from "next-auth/react";


export default function ButtonLogOutModal({ handleClose }) {

    const onClickLogOut = async () => {        
        try {
            await signOut();
            await handleLogOut();
            handleClose();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button className={`${styles.button_sign_in_modal} btn_primary_standard btn_sizeS`} onClick={() => onClickLogOut()}>
            Login
        </button>
    );
}
