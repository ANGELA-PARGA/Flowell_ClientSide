'use client'

import styles from './components.module.css'
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { StoreContext } from '@/context';
import { updateCartItem, deleteCartItem } from '@/actions/cartRequests';
import { signOut } from 'next-auth/react';
import { cookieVerification } from '@/lib/cookieVerification';
import { TrashIcon } from '../../../public/svgIcons';
import debounce from "lodash.debounce";

const UpdateCartItems = ({data, id}) => {
    const { updateProductQtyInCart, populateCartData } = useContext(StoreContext);
    const productId = parseInt(id);    

    const handleUpdate = async (dataToUpdate, e) => {
        e.preventDefault();
        e.stopPropagation(); 
        const response = await cookieVerification()
        if(response.expired){
            toast.error('Your session has expired, please login again')
            setTimeout(async () => {
                await signOut({ callbackUrl: '/login' });
            }, 2000);
        } else {                    
            debouncedUpdate({
                ...dataToUpdate,
                product_id: productId,
            });
        }        
    };

    const debouncedUpdate = debounce(async (productToUpdate) => {
        try {
            const response = await updateCartItem(productToUpdate);
            if(response.expired){
                toast.error('Your session has expired, please login again')
                setTimeout(async () => {
                    await signOut({ callbackUrl: '/login' });
                }, 2000);
                return 
            }            
        } catch (error) {
            console.error('Failed to update item in cart:', error);
            toast.error('Failed to update item in cart');
            return            
        }
        updateProductQtyInCart(productToUpdate.qty, productToUpdate.product_id);
    }, 300);

    const handleDelete = async (e) => {
        e.preventDefault() 
        e.stopPropagation()    
        try {
            const response = await deleteCartItem(productId);
            if(response.expired){
                toast.error('Your session has expired, please login again')
                setTimeout(async () => {
                    await signOut({ callbackUrl: '/login' });
                }, 2000);
            } else {
                await populateCartData()
                toast.success(`Deleted product from the cart`) 
            }            
        } catch (error) {
            console.log(error)
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
                : <button disabled className={styles.update_cart_items_button} onClick={(e)=> handleUpdate({qty : data.qty-1}, e)}> - </button> }
                <p className={styles.dataQty}>{data.qty}</p>
                <button className={styles.update_cart_items_button} onClick={(e)=> handleUpdate({qty : data.qty+1}, e)}> + </button>
                <button className={styles.update_cart_items_button} onClick={(e)=> handleDelete(e)}><TrashIcon width={14} height={14} weight={2}/></button>
            </div>                                             
        </div>
        <div>
            <p className={styles.subtotal_paragraph}>Subtotal: <span>${(data.qty * data.price_per_case.toFixed(2)).toFixed(2)}</span></p>                              
        </div>
        </>
    )
}

export default UpdateCartItems