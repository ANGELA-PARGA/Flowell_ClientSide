'use client'

import styles from './components.module.css'
import { useUpdateFormAction } from '@/hooks/useUpdateFormAction';


const ButtonDelete = ({type, action, resourceType, handleClose}) => {
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
        <button 
            className={`${styles.delete_button} btn_primary_standard btn_sizeS btn-destructive`} 
            onClick={handleOnClick}>
                Delete {type}
        </button>
    )
}

export default ButtonDelete