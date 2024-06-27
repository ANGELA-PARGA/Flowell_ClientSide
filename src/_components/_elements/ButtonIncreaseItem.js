'use client'

import styles from '../_layout_components/navigation_bar/components.module.css'

function onClickIncrease(){
    console.log('calling onclick increase item')
}


export default function ButtonIncreaseItem(){
    return (
        <button className={styles.button_sign_in} onClick={()=> onClickIncrease()}> + </button>
    )
}