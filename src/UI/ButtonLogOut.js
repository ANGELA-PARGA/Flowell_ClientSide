'use client'

import styles from '../components/navigation/components.module.css'
import handleLogOut from '@/actions/logout'

import { signOut } from "next-auth/react";


export default function ButtonLogOut(){

    const onClickLogOut = async () => {
        console.log('calling onclick log out')
        await signOut();
        await handleLogOut();
    }
    return (
        <button className={styles.button_sign_in} onClick={()=> onClickLogOut()}> Log Out </button>
    )
}