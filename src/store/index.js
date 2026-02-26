import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";
import cartInitialState from "./cart/state";
import { cartApi } from "@/store/cart/cartApi";

/**
 * Validates cart data structure before hydration
 * Prevents malformed localStorage data from breaking Redux
 */
const isValidCartData = (data) => {
    return (
        data &&
        typeof data === 'object' &&
        Array.isArray(data.items) &&
        typeof data.total === 'number' &&
        typeof data.total_items === 'number' &&
        (typeof data.id === 'number' || data.id === null)
    );
};

/**
 * Loads persisted cart state from localStorage.
 * Authentication/session cleanup is handled by useCartSync + useUserSync.
 */
const loadPersistedState = () => {
    try {
        if (typeof window === 'undefined') return undefined;
        
        const savedCart = localStorage.getItem('cartData');
        if (!savedCart) return undefined;
        
        const cartData = JSON.parse(savedCart);
        
        // Validate schema before hydrating
        if (!isValidCartData(cartData)) {
            console.warn('Invalid cart data in localStorage, using initial state');
            localStorage.removeItem('cartData');
            return undefined;
        }
        
        return {
            cart: {
                ...cartInitialState,
                ...cartData,
                isLoading: false, 
                error: null,
            }
        };
    } catch (error) {
        console.error('Failed to load persisted state:', error);
        localStorage.removeItem('cartData');
        return undefined;
    }
};

export const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer,    
        preloadedState: loadPersistedState(),    
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [],
            },
        }).concat(localStorageMiddleware, cartApi.middleware),
        
        devTools: process.env.NODE_ENV !== 'production',
    });

    return store;
};
