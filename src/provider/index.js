'use client'

import { useState, useCallback, useEffect } from "react";
import { StoreContext } from "@/context";
import { fetchCartInfoByUser } from "@/actions/cartRequests";

export default function StoreProvider({children}){
    const [cartData, setCartData] = useState(
        () => {
            if (typeof window !== "undefined") {
                const savedCartData = localStorage.getItem('cartData');
                return savedCartData ? JSON.parse(savedCartData) : [];
            }
            return [];
        }
    );

    const populateCartData = useCallback( async () =>{
        try {
            const data = await fetchCartInfoByUser();
            setCartData(data.cart)
            localStorage.setItem('cartData', JSON.stringify(data.cart));        
        } catch (error) {
            console.error('Failed to populate cart data:', error);            
        }
    }, [])

    const getProductQtyInCart = useCallback ((cartData, productId) => {
        if (!cartData?.items?.length) return false;
        const cartItem = cartData.items.find((item) => item.product_id === productId);
        return cartItem ? cartItem.qty : false;
    }, [cartData])

    return (
        <StoreContext.Provider value={{cartData, setCartData, populateCartData, getProductQtyInCart}}>
            {children}
        </StoreContext.Provider>
    )
}
