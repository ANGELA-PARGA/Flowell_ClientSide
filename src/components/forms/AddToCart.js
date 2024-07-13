'use client'

import styles from './components.module.css';
import { TrashIcon } from '../../../public/svgIcons';
import { toast } from 'react-toastify';
import { useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductToCart } from '@/actions/productRequests';
import { updateCartItem, deleteCartItem } from '@/actions/cartRequests';
import { StoreContext } from '@/context';
import Spinner from '@/UI/Spinner';


const AddToCart = ({id}) => {
    const [updateError, setupdateError] = useState();
    const [itemQty, setItemQty] = useState(false);
    const { data: session, status} = useSession();
    const { cartData, populateCartData, getProductQtyInCart } = useContext(StoreContext);
    const productId = parseInt(id); 

    useEffect(() => {
        if (session?.user?.email) {
            const savedCartData = localStorage.getItem('cartData');
            const parsedCartData = savedCartData ? JSON.parse(savedCartData) : null;
            if (parsedCartData) {
                setItemQty(getProductQtyInCart(parsedCartData, productId));
            }
        }
    }, [session, productId, cartData]);


    const schema = yup.object().shape({
        qty: yup.number().required("Please select a quantity")
    });
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = async (data, e) => {
        e.preventDefault()
        await schema.validate(data)
        const productToAdd = {
            ...data,
            product_id:productId,
        }
        try {
            await addProductToCart(productToAdd);
            await populateCartData();
            toast.success(`Added ${productToAdd.qty} cases to the cart`)
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to add to cart')
        }
        
    };

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
        <>
            {status === 'loading' ? (
                <Spinner />
            ) : session?.user?.email ? (
                <div className={styles.add_to_cart_container}>
                {!itemQty ? (
                    <form className={styles.add_to_cart_form} onSubmit={handleSubmit(onSubmit)}>
                    <select {...register("qty")}>
                        {[...Array(30)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                        ))}
                    </select>
                    <button className={styles.add_to_cart_button} type="submit" disabled={isSubmitting}>
                        Add to Cart
                    </button>
                    {errors.quantity && <p>{errors.quantity.message}</p>}
                    </form>
                ) : (
                    <div className={styles.product_cart_buttons_container}>
                        <div className={styles.product_cart_button_minicontainer}>
                            {itemQty > 1 ? (
                            <button className={styles.update_cart_items_button} onClick={(e) => handleUpdate({ qty: itemQty - 1 }, e)}>
                                -
                            </button>
                            ) : (
                            <button className={styles.update_cart_items_button} onClick={(e) => handleDelete(e)}>
                                <TrashIcon width={16} height={16} weight={2} />
                            </button>
                            )}
                            <p>{itemQty}</p>
                            <button className={styles.update_cart_items_button} onClick={(e) => handleUpdate({ qty: itemQty + 1 }, e)}>
                            +
                            </button>
                        </div>
                    <div>
                        {itemQty === 1 ? null : (
                        <button className={styles.update_cart_items_button} onClick={(e) => handleDelete(e)}>
                            <TrashIcon width={14} height={14} weight={2} />
                        </button>
                        )}
                    </div>
                    </div>
                )}
                </div>
            ) : (
                <button className={styles.add_to_cart_button} type="submit">
                Log in to buy
                </button>
            )}
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
            </>
        );
}

export default AddToCart