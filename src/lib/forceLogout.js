import { signOut } from 'next-auth/react';
import handleLogOut from '@/actions/logout';

export async function forceLogOut(handleClose) {
    setTimeout(async () => {
        handleClose();
        await handleLogOut();
        await signOut({ callbackUrl: '/login' });
    }, 3000);
}