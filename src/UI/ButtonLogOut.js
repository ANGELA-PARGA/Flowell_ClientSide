'use client'

import styles from '../components/navigation/components.module.css'
import handleLogOut from '@/actions/logout'
import { signOut } from "next-auth/react";


export default function ButtonLogOut(){

    const onClickLogOut = async () => {
        await signOut();
        await handleLogOut();
        handleClose();        
    }

    return (
        <button className={styles.button_log_out} onClick={()=> onClickLogOut()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M9 12h12l-3 -3" />
            <path d="M18 15l3 -3" />
            </svg>
        </button>
    )
}