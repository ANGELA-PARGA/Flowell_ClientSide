'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '@/store/cart/selectors';
import ProductCartInfo from '@/components/product/ProductCartInfo'
import Link from 'next/link'
import { Suspense } from 'react'
import styles from '../page.module.css'

export default function Cart() {
  const { status } = useSession();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if(status === 'loading') {
    return <h2>Loading cart...</h2>; 
  }

  if(status === 'unauthenticated') { 
    return (
      <section className={`${styles.cartContainer} flex-col-gap`}>
        <h3>Cart</h3>
        <p>Your session has expired. Please login to continue.</p>
        <Link href={'/login'}><button className='btn_primary_standard btn_sizeM'>Go to login</button></Link>
      </section>
    );
  }

  if (!hasMounted) {
    return (
      <section className={`${styles.cartContainer} flex-col-gap`}>
        <h3>Cart</h3>
        <h4>Loading cart...</h4>
      </section>
    );
  }

  
  return (
    <section className={`${styles.cartContainer} flex-col-gap`}>
      <h3>Cart</h3>
      {!cartTotal ? (
        <h4>There aren't products in your cart, go ahead and purchase some flowers!</h4>
      ) : (
        <>
        <Suspense>
          {cartItems.map((item) => (
            <ProductCartInfo data={item} id={item.product_id} key={item.product_id} />          
        ))}
        </Suspense>
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        <Link href={'/checkout'}><button className='btn_primary_standard btn_sizeM'>Place Order</button></Link>
        </>
      )}
    </section>
  );
}
