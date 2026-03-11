'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './index';
import { useCartSync } from '@/hooks/useCartSync';
import { useUserSync } from '@/hooks/useUserSync';
import { useOrdersSync } from '@/hooks/useOrdersSync';

/**
 * Internal component to run sync hooks
 * Must be inside Provider to access Redux
 */
function SyncProvider({ children }) {
    useCartSync(); 
    useUserSync(); 
    useOrdersSync();
    
    return <>{children}</>;
}

/**
 * Redux Provider wrapper for Next.js App Router
 * Includes automatic cart and user state synchronization
 * It uses useRef to create a single store instance that persists across renders, 
 * ensuring consistent state management throughout the app. 
 * The SyncProvider component is nested inside the Redux Provider to allow it to access 
 * the Redux store and run the synchronization hooks effectively.
 */
export function ReduxProvider({ children }) {
    const storeRef = useRef();

    if(!storeRef.current){
        storeRef.current = makeStore()
    }

    return (
        <Provider store={storeRef.current}>
            <SyncProvider>{children}</SyncProvider>
        </Provider>
    );
}
