'use client'

import { useUpdateFormAction } from '@/hooks/useUpdateFormAction';
import styles from './components.module.css'


const ButtonCancelOrder = ({action, resourceType, handleClose}) => {
    const { onSubmit } = useUpdateFormAction(
        action,
        resourceType,        
        handleClose
    );

    const handleOnClick = async (e) =>{
        e.preventDefault();
        await onSubmit();        
    }

    return (
        <button className={`${styles.delete_button} btn_primary_standard btn_sizeS btn-destructive`} 
                type='button' 
                onClick={handleOnClick}
        >Cancel Order</button>
    )
}

export default ButtonCancelOrder