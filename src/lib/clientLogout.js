'use client'

import { signOut } from 'next-auth/react';
import handleLogOut from '@/actions/logout';

const wait = (delayMs) => new Promise((resolve) => {
    setTimeout(resolve, delayMs);
});

export async function executeLogout({ callbackUrl = '/login', onBeforeSignOut } = {}) {
    if (typeof onBeforeSignOut === 'function') {
        onBeforeSignOut();
    }

    try {
        await handleLogOut();
    } catch (error) {
        console.error('Backend logout failed:', error);
    }

    await signOut({ callbackUrl });
}

export async function executeDelayedLogout({ delayMs = 2000, callbackUrl = '/login', onBeforeSignOut } = {}) {
    await wait(delayMs);
    await executeLogout({ callbackUrl, onBeforeSignOut });
}
