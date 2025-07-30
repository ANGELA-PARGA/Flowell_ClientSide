'use client'

import { deletePersonalInfo } from "@/actions/userRequests";
import { toast } from 'react-toastify';
import styles from './components.module.css'


const ButtonDelete = ({type, resourceId, resourceType, handleClose}) => {

    const handleOnClick = async (e) =>{
        e.preventDefault();
        try {
            await deletePersonalInfo(resourceType, resourceId);
            handleClose()
            toast.success(`${type} information deleted succesfully`)            
        } catch (error) {
            console.log(error)
            toast.error(`Failed to delete ${type} information`)
        }        
    }

    return (
        <button className={`${styles.delete_button} btn_primary_standard btn_sizeS btn-destructive`} onClick={(e) => handleOnClick(e)}>Delete {type}</button>
    )
}

export default ButtonDelete