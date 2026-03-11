'use client'

import { useDispatch } from 'react-redux';
import { cancelOrderThunk } from '@/store/orders/thunks';
import { forceLogOut } from '@/lib/forceLogout';
import { toast } from 'react-toastify';
import styles from './components.module.css'


const ButtonCancelOrder = ({id, handleClose}) => {
    const dispatch = useDispatch();

    const handleOnClick = async (e) =>{
        e.preventDefault();
        handleClose();

        try {
            await dispatch(cancelOrderThunk({ orderId: id })).unwrap();
            toast.success('Order cancelled successfully');
        } catch (error) {
            if (error === 'Session expired') {
                toast.error('Your session has expired, please login again');
                await forceLogOut(handleClose);
            } else {
                toast.error('Failed to cancel order');
            }
        }        
    }

    return (
        <button className={`${styles.delete_button} btn_primary_standard btn_sizeS btn-destructive`} 
                type='button' 
                onClick={handleOnClick}
        >Cancel Order</button>
    )
}

export default ButtonCancelOrder