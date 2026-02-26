'use client'

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '@/store/user/slice';
import { selectUserId } from '@/store/user/selectors';

/**
 * Synchronizes Redux user state with NextAuth session
 * 
 * Purpose:
 * - Clears Redux user state when user logs out
 * - Does NOT fetch or hydrate user data (handled by server components)
 * 
 * Pattern:
 * 1. Server components fetch fresh user data on page load
 * 2. Client components hydrate Redux via setUser() action
 * 3. This hook only handles cleanup on logout/session expiry
 * 
 * Why no memoization needed:
 * - status is a primitive string (stable by value)
 * - userId is a primitive from selector (stable by value)
 * - dispatch is guaranteed stable by Redux
 */
export function useUserSync() {
    const { status } = useSession();
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);

    useEffect(() => {
        // Only clear user state when explicitly unauthenticated
        // and Redux still has user data (prevents unnecessary dispatches)
        if (status === 'unauthenticated' && userId) {
            dispatch(clearUser());
        }
    }, [status, userId, dispatch]);
}
