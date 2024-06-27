'use client'

import styles from '../_layout_components/navigation_bar/components.module.css'
import { deleteCartItem } from '@/actions/cartRequests'

function onClickRemove(id){
    console.log('calling onclick remove item #:', id)}
    try {
        deleteCartItem(id);        
    } catch (error) {
        console.log(error)       
    }


export default function ButtonRemoveItem({id}){
    return (
        <button className={styles.button_sign_in} onClick={()=> onClickRemove(id)}> R </button>
    )
}