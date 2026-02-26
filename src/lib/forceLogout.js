import { executeDelayedLogout } from '@/lib/clientLogout';

/**
 * Force logout utility
 * Handles session cleanup when session expires
 * 
 * Note: Redux state (cart/user) is automatically cleared by useCartSync/useUserSync hooks
 * when NextAuth session becomes unauthenticated. No need to manually dispatch here.
 */
export async function forceLogOut(handleClose) {
    await executeDelayedLogout({
        delayMs: 2000,
        callbackUrl: '/login',
        onBeforeSignOut: () => {
            if (handleClose) {
                handleClose();
            }
        },
    });
}