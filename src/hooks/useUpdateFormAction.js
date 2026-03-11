import { useState } from "react";
import { toast } from 'react-toastify';
import { forceLogOut } from '@/lib/forceLogout';

/**
 * A unified wrapper for authenticated asynchronous actions (Redux Thunks or Server Actions).
 * * This hook standardizes form submission and button actions by:
 * 1. Handling "Optimistic UI" closure via handleClose.
 * 2. Managing global session expiration and forced logouts.
 * 3. Providing consistent toast notifications and error state management.
 * * @param {Function} action - The async function to execute (receives 'data' as an argument).
 * @param {string} resourceType - The name of the entity being modified (e.g., 'Shipping', 'Cart').
 * @param {Function} handleClose - Callback to close the UI/Modal immediately.
 * * @returns {{ formError: string|undefined, onSubmit: Function }} 
 * An object containing the current error state and the wrapped submission handler.
 */

export function useUpdateFormAction(action, resourceType, handleClose) {
    const [formError, setFormError] = useState();

    const onSubmit = async (data) => {
        console.log(`[Update ${resourceType}] onSubmit - Entry:`, data);      
        handleClose();        
        try {
            const response = await action(data); 
            if(response?.expired) {
                toast.error('Your session has expired, please login again');
                await forceLogOut();
                return;
            }         
            console.log(`[Update ${resourceType}] onSubmit - Success`);
            toast.success(`${resourceType} information changed successfully`);
        } catch (error) {
            if (error === 'Session expired') {
                console.log(`[Update ${resourceType}] onSubmit - Session expired, forcing logout`);
                toast.error('Your session has expired, please login again');
                await forceLogOut();
            } else {
                toast.error(`Failed to change ${resourceType} information`);
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