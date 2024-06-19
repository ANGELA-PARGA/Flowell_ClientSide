'use client'

import styles from '../_layout_components/components.module.css'
import { updateCartItem } from '@/_utilities/cartRequests';


function onClickUpdateItem(){
    console.log('calling onclick update item with')
    updateCartItem({})
}


export default function ButtonLogOut(){
    return (
        <button className={styles.button_sign_in} onClick={()=> onClickUpdateItem()}> + </button>
    )
}