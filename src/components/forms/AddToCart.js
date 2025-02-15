'use client'

import styles from './components.module.css';
import { TrashIcon } from '../../../public/svgIcons';
import { toast } from 'react-toastify';
import Spinner from '@/UI/Spinner';
import { useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductToCart } from '@/actions/productRequests';
import { updateCartItem, deleteCartItem } from '@/actions/cartRequests';
import { StoreContext } from '@/context';
import { signOut } from 'next-auth/react';
import { cookieVerification } from '@/lib/cookieVerification';
import { debounce } from 'lodash';
import Link from 'next/link';


const schema = yup.object().shape({
    qty: yup.number().required("Please select a quantity")
});

const AddToCart = ({id}) => {
    const { data: session, status} = useSession();
    const productId = parseInt(id);

    const [itemQty, setItemQty] = useState(false);
    const { cartData, populateCartData, getProductQtyInCart, updateProductQtyInCart } = useContext(StoreContext);
    

    useEffect(() => {
        if (session?.user?.email) {
            const savedCartData = localStorage.getItem('cartData');
            const parsedCartData = savedCartData ? JSON.parse(savedCartData) : null;
            if (parsedCartData) {
                setItemQty(getProductQtyInCart(parsedCartData, productId));
            }
        }
    }, [session, productId, cartData]);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });    
    
    const onSubmit = async (data) => {
        await schema.validate(data)
        const productToAdd = {
            ...data,
            product_id:productId,
        }
        try {
            const response = await addProductToCart(productToAdd);
            if(response.expired){
                toast.error('Your session has expired, please login again')
                setTimeout(async () => {
                    await signOut({ callbackUrl: '/login' });
                }, 2000);
                return 
            } else {
                await populateCartData()
                toast.success(`Added ${productToAdd.qty} cases to the cart`)
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to add to cart')
        }
    };

    const handleUpdate = async (dataToUpdate, e) => {
        e.preventDefault();
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
            {status === 'loading' ? (
                <Spinner />
            ) : session?.user?.email ? (
                <div className={styles.add_to_cart_container}>
                {!itemQty ? (
                    <form className={styles.add_to_cart_form} onSubmit={handleSubmit(onSubmit)}>
                        <select {...register("qty")}>
                            {[...Array(15)].map((_, index) => (
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
                    <form className={styles.product_cart_buttons_container}>
                        <div className={styles.product_cart_button_minicontainer}>
                            {itemQty > 1 ? (
                            <button type="submit" className={styles.update_cart_items_button} disabled={isSubmitting} onClick={(e) => handleUpdate({ qty: itemQty - 1 }, e)}>
                                -
                            </button>
                            ) : (
                            <button type="submit" disabled className={styles.update_cart_items_button} onClick={(e) => handleUpdate({ qty: itemQty - 1 }, e)}>
                                -
                            </button>
                            
                            )}
                            <p>{itemQty}</p>
                            <button type="submit" className={styles.update_cart_items_button} disabled={isSubmitting} onClick={(e) => handleUpdate({ qty: itemQty + 1 }, e)}>
                            +
                            </button>
                            <button type="submit" className={styles.update_cart_items_button} disabled={isSubmitting} onClick={(e) => handleDelete(e)}>
                                <TrashIcon width={16} height={16} weight={2} />
                            </button>
                        </div>
                    </form>
                )}
                </div>
            ) : (
                <Link href={'/login'}><button className={styles.add_to_cart_button} type="button">Log in to buy</button></Link>  
            )}
            </>
        );
}

export default AddToCart