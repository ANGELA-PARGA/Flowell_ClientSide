'use client'

import Link from 'next/link';
import styles from './components.module.css'
import { StoreContext } from '@/context';
import { useContext } from 'react';
import ProductCartMenu from '../product/ProductCartMenu';

const MenuAuthCart = ({handleClose}) => {
    const {cartData} = useContext(StoreContext);

    return (
        cartData.total ? 
                <div className={`${styles.dropdown_menu_authenticated} flex-col-gap-xl ${styles.dropdown_menu_authenticated_cart}`}>                
            {
                <>                    
                {cartData.items.map((item) => (
                    <ProductCartMenu data={item} id={item.product_id} key={item.product_id} />          
                ))}                    
                <h3 className={styles.dropdown_total_cart}>Total: ${cartData.total.toFixed(2)}</h3>
                <div>
                    <Link href='/account/cart' onClick={()=> handleClose()}><button className='btn_primary_standard btn_sizeS'>View</button></Link>
                </div>
                </>
            }
            </div> :
            <div className={`${styles.dropdown_menu_unauthenticated} flex-col-gap-xl`}>
                <div className={styles.unauthenticated_options}>
                    <p>Your cart is empty</p>
                    <div>
                        <Link href='/account/cart' onClick={()=> handleClose()}><button className='btn_primary_standard btn_sizeS'>View cart</button></Link>
                    </div>
                </div>   
            </div>
        
    );
};

export default MenuAuthCart;