'use client'

import styles from './page.module.css'
import ProductCartInfo from '@/components/product/ProductCartInfo'
import { StoreContext } from '@/context'
import { useContext } from 'react'


export default function Cart() {
  const { cartData } = useContext(StoreContext);
  console.log('data in Cart component', cartData)
  

  return (
    <section className={styles.cartContainer}>
      <h2>Cart</h2>
      {!cartData.items[0].product_id ? (
        <p>There aren't products in your cart, go ahead and purchase some flowers!</p>
      ) : (
        <>
        <div>
          {cartData.items.map((item) => (
            <ProductCartInfo data={item} id={item.product_id} key={item.product_id} />          
        ))}
        </div>
        <h3>Total: ${cartData.total.toFixed(2)}</h3>
        <button className={styles.place_order_button}>Place Order</button>
        </>
      )}
    </section>
  );
}
