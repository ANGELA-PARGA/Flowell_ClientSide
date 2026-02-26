'use client'

import styles from './components.module.css'
import { toast } from 'react-toastify';
import { TrashIcon } from '../../../public/svgIcons';
import { useOptimisticCartItem } from '@/hooks/useOptimisticCartItem';
import { executeDelayedLogout } from '@/lib/clientLogout';

const UpdateCartItems = ({data, id}) => {
    const productId = parseInt(id, 10);

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
        subtotal,
        isPending,
        incrementQty,
        decrementQty,
        deleteItem,
    } = useOptimisticCartItem({
        item: data,
        productId,
        onSessionExpired: handleSessionExpired,
        onRequestError: handleRequestError,
    });

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
        e.preventDefault();
        e.stopPropagation();
        const wasDeleted = await deleteItem();
        if (wasDeleted) {
            toast.success('Deleted product from the cart');
        }
    };

    return (
        <>
        <div className={styles.product_cart_buttons_container}>
            <div className={styles.product_cart_button_minicontainer}>
                {optimisticQty > 1 ? (
                    <button className={styles.update_cart_items_button} onClick={handleDecrease}> - </button> 
                )
                : <button disabled className={styles.update_cart_items_button} onClick={handleDecrease}> - </button> }
                <p className={styles.dataQty}>{optimisticQty}</p>
                <button className={styles.update_cart_items_button} onClick={handleIncrease}> + </button>
                <button className={styles.update_cart_items_button} onClick={handleDelete} disabled={isPending}><TrashIcon width={14} height={14} weight={2}/></button>
            </div>                                             
        </div>
        <div>
            <p className='flex-row-gap-xs'>Subtotal: <span>${subtotal.toFixed(2)}</span></p>                              
        </div>
        </>
    )
}

export default UpdateCartItems