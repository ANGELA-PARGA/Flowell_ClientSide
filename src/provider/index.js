'use client'
import { useState, useCallback } from "react";
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
            console.log('calling populate data')
            const data = await fetchCartInfoByUser();
            console.log('cart data received from server', data)
            setCartData(data.cart)
            localStorage.setItem('cartData', JSON.stringify(data.cart));        
        } catch (error) {
            console.error('Failed to populate cart data:', error);            
        }
    }, [])

    const getProductQtyInCart = useCallback ((cartData, productId) => {
        console.log('calling get product qty in cart')
        if (!cartData?.items?.length) return false;
        const cartItem = cartData.items.find((item) => item.product_id === productId);
        return cartItem ? cartItem.qty : false;
    }, [])

    const updateProductQtyInCart = useCallback ((newQty, productId) => {
        console.log('calling update product qty in cart', newQty, productId)
        const updatedCartItems = cartData.items.map(item =>
            item.product_id === productId ? { ...item, qty: newQty } : item
        );
        setCartData({ ...cartData, items: updatedCartItems });
        return true;
    }, [cartData])

    return (
        <StoreContext.Provider value={{cartData, setCartData, populateCartData, getProductQtyInCart, updateProductQtyInCart}}>
            {children}
        </StoreContext.Provider>
    )
}
