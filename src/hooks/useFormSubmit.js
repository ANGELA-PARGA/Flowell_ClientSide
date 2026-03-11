import { useDispatch } from 'react-redux';
import { useState } from "react";
import { toast } from 'react-toastify';
import { forceLogOut } from '@/lib/forceLogout';

export function useFormSubmit(action, resourceType, resourceId, handleClose) {
    const [formError, setFormError] = useState();
    const dispatch = useDispatch() 

    const onSubmit = async (data) => {
        console.log(`[Update ${resourceType}] onSubmit - Entry:`, data);      
        handleClose();        
        try {
            await dispatch(action({
                data,
                resourceType,
                resourceId
            })).unwrap();
            
            console.log(`[Update ${resourceType}] onSubmit - Success`);
            toast.success(`${resourceType} information updated successfully`);
        } catch (error) {
            if (error === 'Session expired') {
                console.log(`[Update ${resourceType}] onSubmit - Session expired, forcing logout`);
                toast.error('Your session has expired, please login again');
                await forceLogOut();
            } else {
                toast.error(`Failed to update ${resourceType} information`);
            }
            console.error(`[Update ${resourceType}] onSubmit - Error:`, error);
            setFormError(error.message);         
            
        }
    }; 


    return { 
        formError, 
        onSubmit 
    };
}