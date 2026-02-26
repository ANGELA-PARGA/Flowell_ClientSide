"use client"	

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useSelector } from 'react-redux';
import { selectCartTotalItems } from '@/store/cart/selectors';
import { CartIconNavBar } from '../../../public/svgIcons';
import styles from './components.module.css';

const CartItems = () => {
    const { data: session, status } = useSession();
    const totalItems = useSelector(selectCartTotalItems);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const shouldShowCartItems = hasMounted && status !== 'loading' && session?.user?.email;

    return (
        <div className={styles.auth_button}>
            <CartIconNavBar width={28} height={28} weight={2} />
            <span className={styles.number_items_cart}>
                <span className={styles.itemNumber}>{shouldShowCartItems ? totalItems : 0}</span>
            </span>
        </div>
    );
};

export default CartItems;
