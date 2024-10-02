'use client'

import { StoreContext } from '@/context'
import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCheckoutInfo from '@/components/product/ProductCheckoutInfo'
import CheckoutForm from '@/components/forms/CheckoutForm'
import styles from './components.module.css'


const CheckoutDashboard = ({data}) => {
    const { cartData } = useContext(StoreContext);
    const [isClient, setIsClient] = useState(false);

    // Ensure the component is rendered only after the client-side cart data is available
    useEffect(() => {
        setIsClient(true);  
    }, []);

    // While on the server or if cartData is not available, don't render the cart-related elements
    if (!isClient) {
        return null;  
    }


    if(!cartData.total){
        return(
        <div>
            <p>There aren't products in your cart, go ahead and purchase some flowers!</p>
            <br />
            <Link href={'/account/cart'}><button className={styles.returnCart}>Cart</button></Link>
        </div>

        )
    }

    return (     
        <div className={styles.checkoutDashboard}>
            <div>
                <CheckoutForm data={data}/>           
            </div>
            <div className={styles.checkoutProducts}>
                <div>
                {cartData.items.map((item) => (
                    <ProductCheckoutInfo data={item} key={item.product_id} />          
                ))}
                </div>
                <h4>Total: ${cartData.total.toFixed(2)}</h4>
                <Link href={'/account/cart'}><button className={styles.place_order_button}>Return to Cart</button></Link>
            </div>
        </div>
    )
}

export default CheckoutDashboard