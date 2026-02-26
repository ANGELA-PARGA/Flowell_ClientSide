const SESSION_EXPIRED_CODE = 'SESSION_EXPIRED';

export function createSessionExpiredResponse(message = 'Session expired') {
    return {
        expired: true,
        code: SESSION_EXPIRED_CODE,
        message,
    };
}

export function isUnauthorizedStatus(status) {
    return status === 401 || status === 403;
}
