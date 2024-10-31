'use client'

import styles from './page.module.css'
import ProductCartInfo from '@/components/product/ProductCartInfo'
import { StoreContext } from '@/context'
import { useContext } from 'react'
import Link from 'next/link'
import { Suspense } from 'react'


export default function Cart() {
  const { cartData } = useContext(StoreContext);  

  if (!cartData || !cartData.items) {
    return <h2>Loading cart...</h2>; 
  }

  
  return (
    <section className={styles.cartContainer}>
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
        <Link href={'/checkout'}><button className={styles.place_order_button}>Place Order</button></Link>
        </>
      )}
    </section>
  );
}
