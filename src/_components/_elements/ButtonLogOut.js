'use client'

import styles from '../_layout_components/navigation_bar/components.module.css'
import handleLogOut from '@/actions/logout'

import { signOut } from "next-auth/react";

function onClickLogOut(){
    console.log('calling onclick log out')
    handleLogOut();
    signOut();
}


export default function ButtonLogOut(){
    return (
        <button className={styles.button_sign_in} onClick={()=> onClickLogOut()}> Log Out </button>
    )
}