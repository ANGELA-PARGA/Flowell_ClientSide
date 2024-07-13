import { fetchCartInfoByUser } from '@/actions/cartRequests'
import styles from './page.module.css'
import ProductCartInfo from '@/components/product/ProductCartInfo'

export default async function Cart() {
  const response = await fetchCartInfoByUser()
  const data = response.cart
  console.log('data in Cart component', data)  

  return (
    <section className={styles.cartContainer}>
      <h2>Cart</h2>
      {!data.items[0].product_id ? (
        <p>There aren't products in your cart, go ahead and purchase some flowers!</p>
      ) : (
        <>
        <div>
          {data.items.map((item) => (
            <ProductCartInfo data={item} id={item.product_id} key={item.product_id} />          
        ))}
        </div>
        <h3>Total: ${data.total.toFixed(2)}</h3>
        <button className={styles.place_order_button}>Place Order</button>
        </>
      )}
    </section>
  );
}
