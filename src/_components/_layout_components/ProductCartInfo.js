'use client'

import styles from './components.module.css'
import Image from 'next/image';
import mini_image1 from '../../../public/mini_image1.jpeg'
import { toast } from 'react-toastify';
import { useState, useContext } from 'react';
import { StoreContext } from '@/context';
import { updateCartItem, deleteCartItem } from '@/actions/cartRequests';
import { TrashIcon } from '../../../public/svgIcons';

const ProductCartInfo = ({data, id}) => {
    const [updateError, setupdateError] = useState();
    const { populateCartData } = useContext(StoreContext);
    const productId = parseInt(id);    
    
    const handleUpdate = async (data, e) => {
        e.preventDefault()
        const productToUpdate = {
            ...data,
            product_id:productId,
        }
        console.log('handle update:', productToUpdate)
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
        console.log('handle delete:', productId)        
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
        <div className={styles.product_cart_maincontainer}>
            <div className={styles.product_cart_small_img}>
                <Image src={mini_image1}
                    sizes="100vw"
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '25%'
                    }}
                    alt='mini image of the product in the cart'>
                </Image>
            </div>
            <div className={styles.product_cart_details_info}>
                <div><p>{data.name}</p></div>
                <div><span>${data.price_per_case.toFixed(2)}</span></div>
            </div>
            <div className={styles.product_cart_buttons_container}>
                <div className={styles.product_cart_button_minicontainer}>
                    {data.qty > 1 ? <button className={styles.update_cart_items_button} onClick={(e)=> handleUpdate({qty : data.qty-1}, e)}> - </button> : <button className={styles.update_cart_items_button} onClick={(e)=> handleDelete(e)}><TrashIcon width={16} height={16} weight={2}/></button>}
                    <p>{data.qty}</p>
                    <button className={styles.update_cart_items_button} onClick={(e)=> handleUpdate({qty : data.qty+1}, e)}> + </button>
                </div>
                <div>
                    {data.qty === 1 ? <></>:<button className={styles.update_cart_items_button} onClick={(e)=> handleDelete(e)}><TrashIcon width={16} height={16} weight={2}/></button>}
                </div>                                
            </div>
            <div>
                <p>Subtotal: <span>${(data.qty * data.price_per_case.toFixed(2)).toFixed(2)}</span></p>                              
            </div>
            {
                updateError && (
                    <div>{updateError}</div>
                )
            }
        </div>
        
        
    )

};

export default ProductCartInfo;