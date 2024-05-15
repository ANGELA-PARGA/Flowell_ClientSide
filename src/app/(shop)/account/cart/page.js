import { fetchCartInfoByUser } from '@/_utilities/cartRequests'
import styles from './page.module.css'

export default async function Cart() {
  const response = await fetchCartInfoByUser()
  const data = response.cart
  console.log(data)

  return (
    <section className={styles.cartContainer}>
      <h2>Cart</h2>
      {data.items.length === 0 ? (
        <p>There aren't products in your cart</p>
      ) : (
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price Per Case</th>
              <th>Subtotal</th>
              <th>Edit Qty</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.product_id}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>${item.price_per_case.toFixed(2)}</td>
                <td>${(item.qty * item.price_per_case).toFixed(2)}</td>
                <td className={styles.table_button_container}>
                  <button>+</button>
                  <button>-</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p>Total: ${data.total.toFixed(2)}</p>
      <button className={styles.place_order_button}>Place Order</button>
    </section>
  );
}
