'use client'
import { useState, useCallback, useEffect } from "react";
import { StoreContext } from "@/context";
import { fetchCartInfoByUser } from "@/actions/cartRequests";

export default function StoreProvider({children}){
    const [cartData, setCartData] = useState({});

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedCartData = localStorage.getItem('cartData');
            if (savedCartData) {
                setCartData(JSON.parse(savedCartData));
            }
        }
    }, []);

    const populateCartData = useCallback(async () =>{
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
    }, [])

    const updateProductQtyInCart = useCallback (async (newQty, productId) => {
        let {total, total_items, items, id} = cartData;
        const itemToUpdate = items?.find(item => item.product_id === productId);
        if (!itemToUpdate) return false;
        
        const updatedCartItems = items.map(item => {
            const updatedItem = item.product_id === productId ? { ...item, qty: newQty} : item;
            return updatedItem;
        });
        total = total - (itemToUpdate.qty * itemToUpdate.price_per_case) + (newQty * itemToUpdate.price_per_case);
        total_items = total_items - itemToUpdate.qty + newQty;

        setCartData({ id, items: updatedCartItems, total, total_items});
        localStorage.setItem('cartData', JSON.stringify({ id, items: updatedCartItems, total, total_items}));
        return true;
    }, [cartData])

    return (
        <StoreContext.Provider value={
            {   cartData, 
                setCartData, 
                populateCartData, 
                getProductQtyInCart, 
                updateProductQtyInCart
            }}>
            {children}
        </StoreContext.Provider>
    )
}
