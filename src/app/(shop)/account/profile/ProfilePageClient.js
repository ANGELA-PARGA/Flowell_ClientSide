'use client'

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/user/slice';
import { selectUserAddresses, selectUserPhones, selectUserId } from '@/store/user/selectors';
import ProfilePersonalInfo from '@/components/profile/ProfilePersonalInfo';
import ProfileAddressInfo from '@/components/profile/ProfileAddressInfo';
import ProfilePhoneInfo from '@/components/profile/ProfilePhoneInfo';

/**
 * Profile page using hybrid Next.js + Redux pattern
 * 
 * @param {Object} initialUserData - Server-fetched user data (SSR)
 * 
 * Pattern:
 * 1. Server fetches fresh data on page load (Next.js caching)
 * 2. Client initializes Redux with this data
 * 3. User makes changes → Optimistic Redux updates
 * 4. On success → Redux persists, server revalidates
 * 5. On error → Redux rolls back via server revalidation
 */
export default function ProfilePageClient({ initialUserData }) {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const addresses = useSelector(selectUserAddresses);
    const phones = useSelector(selectUserPhones);

    const userDataKey = useMemo(
        () => JSON.stringify(initialUserData),
        [initialUserData]
    );

    // Hydrate Redux with server data on mount AND when server data changes
    // This ensures revalidatePath() updates are reflected in Redux
    useEffect(() => {
        if (!initialUserData) return;

        const shouldHydrate = !userId || userId !== initialUserData.id;

        if (shouldHydrate) {
            dispatch(setUser(initialUserData));
        }
    }, [userDataKey, userId, dispatch]);

    return (
        <section className='flex-col-gap'>
            <ProfilePersonalInfo />
            <ProfileAddressInfo addresses={addresses} />
            <ProfilePhoneInfo phones={phones} /> 
        </section>
    );
}