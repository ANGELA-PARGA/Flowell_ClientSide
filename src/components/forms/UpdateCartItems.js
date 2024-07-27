'use client'

import styles from './components.module.css'
import { toast } from 'react-toastify';
import { useState, useContext } from 'react';
import { StoreContext } from '@/context';
import { updateCartItem, deleteCartItem } from '@/actions/cartRequests';
import { TrashIcon } from '../../../public/svgIcons';

const UpdateCartItems = ({data, id}) => {
    const [updateError, setupdateError] = useState();
    const { populateCartData } = useContext(StoreContext);
    const productId = parseInt(id);    

    const handleUpdate = async (dataToUpdate, e) => {
        e.preventDefault()
        const productToUpdate = {
            ...dataToUpdate,
            product_id:productId,
        }
        try {
            await updateCartItem(productToUpdate);
            await populateCartData();
            toast.success(`Updated ${productToUpdate.qty} case(s) to the cart`)
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to update item in cart')
        }
        
    };

    const handleDelete = async (e) => {
        e.preventDefault()      
        try {
            await deleteCartItem(productId);
            await populateCartData();
            toast.success(`Deleted product to the cart`)
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error(`Failed to delete product in cart`)
        }
        
    };
    return (
        <>
        <div className={styles.product_cart_buttons_container}>
            <div className={styles.product_cart_button_minicontainer}>
                {data.qty > 1 ? (
                    <button className={styles.update_cart_items_button} onClick={(e)=> handleUpdate({qty : data.qty-1}, e)}> - </button> 
                )
                : <button className={styles.update_cart_items_button} onClick={(e)=> handleDelete(e)}><TrashIcon width={14} height={14} weight={2}/></button>}
                <p className={styles.dataQty}>{data.qty}</p>
                <button className={styles.update_cart_items_button} onClick={(e)=> handleUpdate({qty : data.qty+1}, e)}> + </button>
                <div>
                    {data.qty === 1 ? <></>:<button className={styles.update_cart_items_button} onClick={(e)=> handleDelete(e)}><TrashIcon width={14} height={14} weight={2}/></button>}
                </div>
            </div>                                                
        </div>
        <div className={styles.subtotal_cart}>
            <p>Subtotal: <span>${(data.qty * data.price_per_case.toFixed(2)).toFixed(2)}</span></p>                              
        </div>
        {updateError && (<div>{updateError}</div>)}
        </>
    )
}

export default UpdateCartItems