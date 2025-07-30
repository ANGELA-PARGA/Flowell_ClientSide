'use client'

import { cancelOrder } from '@/actions/ordersRequest';
import { toast } from 'react-toastify';
import styles from './components.module.css'


const ButtonCancelOrder = ({id, handleClose}) => {

    const handleOnClick = async (e) =>{
        e.preventDefault();
        try {
            await cancelOrder(id);
            handleClose()
            toast.success(`order cancelled succesfully`)            
        } catch (error) {
            console.log(error)
            toast.error(`Failed to cancel order`)
            handleClose()
        }        
    }

    return (
        <button className={`${styles.delete_button} btn_primary_standard btn_sizeS btn-destructive`} type='button' onClick={(e) => handleOnClick(e)}>Cancel Order</button>
    )
}

export default ButtonCancelOrder