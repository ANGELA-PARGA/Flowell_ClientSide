'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectProductQtyInCart } from '@/store/cart/selectors';
import { useAddProductToCartMutation } from '@/store/cart/cartApi';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from 'next/link';
import styles from './components.module.css';
import { TrashIcon } from '../../../public/svgIcons';
import { toast } from 'react-toastify';
import Spinner from '@/UI/Spinner';
import { useOptimisticCartItem } from '@/hooks/useOptimisticCartItem';
import { executeDelayedLogout } from '@/lib/clientLogout';


const schema = yup.object().shape({
    qty: yup.number().required("Please select a quantity")
});

const AddToCart = ({id}) => {
    const [hasMounted, setHasMounted] = useState(false);
    const { status} = useSession();

    useEffect(() => { setHasMounted(true); }, []);
    
    const productId = parseInt(id, 10);
    const [addProductToCart, { isLoading: isAdding }] = useAddProductToCartMutation();
    
    const itemQty = useSelector((state) => selectProductQtyInCart(state, productId));

    const handleSessionExpired = async () => {
        toast.error('Your session has expired, please login again');
        await executeDelayedLogout({
            delayMs: 2000,
            callbackUrl: '/login',
        });
    };

    const handleRequestError = (_error, type, message) => {
        if (type === 'delete') {
            toast.error(message ?? 'Failed to delete product in cart');
            return;
        }

        toast.error(message ?? 'Failed to update item in cart');
    };

    const {
        optimisticQty,
        isPending,
        incrementQty,
        decrementQty,
        deleteItem,
    } = useOptimisticCartItem({
        item: {
            qty: itemQty,
            price_per_case: 0,
        },
        productId,
        onSessionExpired: handleSessionExpired,
        onRequestError: handleRequestError,
    });


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });    
    
    const onSubmit = async (data) => {
        await schema.validate(data)
        const productToAdd = {
            qty: Number(data.qty),
            product_id: productId,
        }

        try {
            await addProductToCart(productToAdd).unwrap();
            toast.success(`Added ${productToAdd.qty} cases to the cart`)
        } catch (error) {
            const statusCode = error?.status ?? error?.originalStatus;
            const errorCode = error?.data?.code;
            const errorMessage = error?.data?.message;
            if (statusCode === 401 || statusCode === 403 || errorCode === 'SESSION_EXPIRED') {
                await handleSessionExpired();
            } else {
                toast.error(errorMessage ?? 'Failed to add to cart')
            }
        }
    };

    const handleDecrease = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        decrementQty();
    };

    const handleIncrease = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        incrementQty();
    };

    const handleDelete = async (e) => {
        e.preventDefault() 
        e.stopPropagation()
        const wasDeleted = await deleteItem();
        if (wasDeleted) {
            toast.success(`Deleted product from the cart`);
        }
    };

    return (
        <>
            {status === 'loading' ? (
                <Spinner />
            ) : status === 'authenticated' ? (
                <div className={styles.add_to_cart_container}>
                {!hasMounted || !itemQty ? (
                    <form className={`${styles.add_to_cart_form} flex-row-gap`} onSubmit={handleSubmit(onSubmit)}>
                        <select {...register("qty")}>
                            {[...Array(15)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                            ))}
                        </select>
                        <button className="btn_primary_standard btn_sizeL alignCenter" type="submit" disabled={isSubmitting || isAdding}>
                            Add to Cart
                        </button>
                        {errors.qty && <p>{errors.qty.message}</p>}
                    </form>
                ) : (
                    <form className={styles.product_cart_buttons_container}>
                        <div className={styles.product_cart_button_minicontainer}>
                            {optimisticQty > 1 ? (
                            <button type="button" className={styles.update_cart_items_button} onClick={handleDecrease}>
                                -
                            </button>
                            ) : (
                            <button type="button" disabled className={styles.update_cart_items_button} onClick={handleDecrease}>
                                -
                            </button>
                            
                            )}
                            <p>{optimisticQty}</p>
                            <button type="button" className={styles.update_cart_items_button} onClick={handleIncrease}>
                            +
                            </button>
                            <button type="button" className={styles.update_cart_items_button} disabled={isPending} onClick={handleDelete}>
                                <TrashIcon width={16} height={16} weight={2} />
                            </button>
                        </div>
                    </form>
                )}
                </div>
            ) : (
                <button className="btn_primary_standard btn_sizeL alignCenter" type="button"><Link href={'/login'}>Log in to buy</Link></button>  
            )}
            </>
        );
}

export default AddToCart