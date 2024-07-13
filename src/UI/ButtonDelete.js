'use client'

import { deletePersonalInfo } from "@/actions/userRequests";
import { toast } from 'react-toastify';


const ButtonDelete = ({type, resourceId, resourceType}) => {

    const handleOnClick = async (e) =>{
        e.preventDefault();
        try {
            await deletePersonalInfo(resourceType, resourceId);
            toast.success(`${type} information deleted succesfully`)            
        } catch (error) {
            console.log(error)
            toast.error(`Failed to delete ${type} information`)
        }        
    }

    return (
        <button onClick={(e) => handleOnClick(e)}>Delete {type}</button>
    )
}

export default ButtonDelete