import styles from './components.module.css'
export default function CartDescription({item}) {
    return (
        <div key={item.product_id} className={styles.cartInfoCard}> 
            <p className={styles.cartProductName}>ID #{item.product_id}: {item.name}</p>
            <p className={styles.cartProductQty}>Quantity: {item.qty}</p>
            <p className={styles.cartProductPrice}>Price per case: ${item.price_per_case}</p>
            <p className={styles.cartProductTotal}>total per item: ${item.price_per_case * item.qty}</p>
        </div>
    );
}