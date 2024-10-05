'use client'

import { deleteOrder } from '@/actions/ordersRequest';
import { toast } from 'react-toastify';


const ButtonCancelOrder = ({id}) => {

    const handleOnClick = async (e) =>{
        e.preventDefault();
        try {
            await deleteOrder(id);
            toast.success(`order cancelled succesfully`)            
        } catch (error) {
            console.log(error)
            toast.error(`Failed to cancel order`)
        }        
    }

    return (
        <button type='button' onClick={(e) => handleOnClick(e)}>Cancel Order</button>
    )
}

export default ButtonCancelOrder