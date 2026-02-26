'use client'

import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '@/store/cart/selectors';
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCheckoutInfo from '@/components/product/ProductCheckoutInfo'
import CheckoutForm from '@/components/forms/CheckoutForm'
import styles from './components.module.css'


const CheckoutDashboard = ({data}) => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [isClient, setIsClient] = useState(false);

    // Ensure the component is rendered only after the client-side cart data is available
    useEffect(() => {
        setIsClient(true);  
    }, []);

    // While on the server or if cartData is not available, don't render the cart-related elements
    if (!isClient) {
        return null;  
    }


    if(!cartTotal){
        return(
        <div>
            <h4>There aren't products in your cart, go ahead and purchase some flowers!</h4>
            <br />
            <Link href={'/account/cart'}><button className='btn_primary_standard btn_sizeM'>Cart</button></Link>
        </div>

        )
    }

    return (     
        <div className={styles.checkoutDashboard}>
            <div className={`${styles.checkoutProducts} flex-col-gap`}>
                <div>
                {cartItems.map((item) => (
                    <ProductCheckoutInfo data={item} key={item.product_id} />          
                ))}
                </div>
                <h3>Total: ${cartTotal.toFixed(2)}</h3>
                <Link href={'/account/cart'}><button className='btn_primary_standard btn_sizeM'>Return to Cart</button></Link>
            </div>
            <div>
                <CheckoutForm data={data}/>           
            </div>
        </div>
    )
}

export default CheckoutDashboard