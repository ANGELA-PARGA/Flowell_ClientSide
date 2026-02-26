'use client'

import { useDispatch } from 'react-redux';
import { deleteUserInfo } from '@/store/user/thunks';
import { toast } from 'react-toastify';
import styles from './components.module.css'


const ButtonDelete = ({type, resourceId, resourceType, handleClose}) => {
    const dispatch = useDispatch();

    const handleOnClick = async (e) =>{
        e.preventDefault();
        console.log('[ButtonDelete] Delete clicked:', { resourceType, resourceId });
        
        try {
            await dispatch(deleteUserInfo({ resourceType, resourceId })).unwrap();
            console.log('[ButtonDelete] Delete successful');
            handleClose()
            toast.success(`${type} information deleted successfully`)            
        } catch (error) {
            console.log('[ButtonDelete] Delete failed:', error);
            if (error === 'Session expired') {
                toast.error('Session expired, please login again');
            } else {
                toast.error(`Failed to delete ${type} information`);
            }
        }        
    }

    return (
        <button className={`${styles.delete_button} btn_primary_standard btn_sizeS btn-destructive`} onClick={(e) => handleOnClick(e)}>Delete {type}</button>
    )
}

export default ButtonDelete