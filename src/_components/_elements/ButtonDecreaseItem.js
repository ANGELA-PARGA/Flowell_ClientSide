'use client'

import styles from '../_layout_components/navigation_bar/components.module.css'

function onClickDecrease(){
    console.log('calling onclick decrease item')
}

export default function ButtonDecreaseItem(){
    return (
        <button className={styles.button_sign_in} onClick={()=> onClickDecrease()}> - </button>
    )
}