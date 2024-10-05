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
import { debounce } from 'lodash';
import Link from 'next/link';


const AddToCart = ({id}) => {
    const [updateError, setupdateError] = useState();
    const [itemQty, setItemQty] = useState(false);
    const { data: session, status} = useSession();
    const { cartData, populateCartData, getProductQtyInCart, updateProductQtyInCart } = useContext(StoreContext);
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

    const handleUpdate = async (dataToUpdate, e) => {
        e.preventDefault();
        updateProductQtyInCart(dataToUpdate.qty, productId);        
        debouncedUpdate({
            ...dataToUpdate,
            product_id: productId,
        });        
    };

    const debouncedUpdate = debounce(async (productToUpdate) => {
        try {
            await updateCartItem(productToUpdate);
            await populateCartData();
            toast.success(`Updated ${productToUpdate.qty} case(s) to the cart`);
        } catch (error) {
            console.error('Failed to update item in cart:', error);
            setupdateError(error.message);
            toast.error('Failed to update item in cart');
        }
    }, 300);

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
                    {errors.qty && <p>{errors.qty.message}</p>}
                    </form>
                ) : (
                    <div className={styles.product_cart_buttons_container}>
                        <div className={styles.product_cart_button_minicontainer}>
                            {itemQty > 1 ? (
                            <button className={styles.update_cart_items_button} onClick={(e) => handleUpdate({ qty: itemQty - 1 }, e)}>
                                -
                            </button>
                            ) : (
                            <button disabled className={styles.update_cart_items_button} onClick={(e) => handleUpdate({ qty: itemQty - 1 }, e)}>
                                -
                            </button>
                            
                            )}
                            <p>{itemQty}</p>
                            <button className={styles.update_cart_items_button} onClick={(e) => handleUpdate({ qty: itemQty + 1 }, e)}>
                            +
                            </button>
                            <button className={styles.update_cart_items_button} onClick={(e) => handleDelete(e)}>
                                <TrashIcon width={16} height={16} weight={2} />
                            </button>
                        </div>
                    </div>
                )}
                </div>
            ) : (
                <Link href={'/login'}><button className={styles.add_to_cart_button} type="button">Log in to buy</button></Link>  
            )}
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
            </>
        );
}

export default AddToCart