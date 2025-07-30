'use client'

import { useContext } from 'react'
import { StoreContext } from '@/context'
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic'
import ProductCartInfo from '@/components/product/ProductCartInfo'
import Link from 'next/link'
import { Suspense } from 'react'
import styles from '../page.module.css'

const MyModalLogin = dynamic(()=> import("@/UI/MyModalLogin"))

export default function Cart() {
  const { data: session, status} = useSession();

  if(status === 'loading') {
    return <h2>Loading cart...</h2>; 
  }

  if(status === 'unauthenticated') { 
    return <MyModalLogin />;
  }

  const { cartData } = useContext(StoreContext);  

  if (!cartData || !cartData.items) {
    return <h2>Loading cart...</h2>; 
  }

  
  return (
    <section className={`${styles.cartContainer} flex-col-gap`}>
      <h3>Cart</h3>
      {!cartData?.total ? (
        <h4>There aren't products in your cart, go ahead and purchase some flowers!</h4>
      ) : (
        <>
        <Suspense>
          {cartData.items.map((item) => (
            <ProductCartInfo data={item} id={item.product_id} key={item.product_id} />          
        ))}
        </Suspense>
        <h3>Total: ${cartData.total.toFixed(2)}</h3>
        <Link href={'/checkout'}><button className='btn_primary_standard btn_sizeM'>Place Order</button></Link>
        </>
      )}
    </section>
  );
}
