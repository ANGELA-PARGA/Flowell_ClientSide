import debounce from 'lodash.debounce';

const STORAGE_KEY = 'cartData';

/**
 * Debounced save function to reduce localStorage I/O
 * Delays write by 300ms, batching rapid updates
 */
const saveToLocalStorage = debounce((cartState) => {
    try {
        if (!cartState.id && cartState.items.length === 0) {
            localStorage.removeItem(STORAGE_KEY);
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
        }
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
    }
}, 300);

export const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    const shouldPersist = 
        action.type?.startsWith('cart/') && 
        (action.type.includes('fulfilled') || 
        action.type === 'cart/clearCart' ||
        action.type === 'cart/hydrateCart');

    if (shouldPersist) {
        const { cart } = store.getState();
        const cartState = {
            id: cart.id,
            items: cart.items,
            total: cart.total,
            total_items: cart.total_items,
            lastUpdated: cart.lastUpdated,
        };

        saveToLocalStorage(cartState);
    }

    return result;
};