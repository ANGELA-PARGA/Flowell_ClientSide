import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export async function middleware(req) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;
    const isProtectedRoute = pathname.startsWith('/account') || pathname.startsWith('/checkout');
    const isAuthPage = pathname === '/login' || pathname === '/register';
    const isRecoverPasswordPage = pathname.startsWith('/recover_password');

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token && (isAuthPage || isRecoverPasswordPage)) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/account/:path*',  '/checkout', '/login', '/register', '/recover_password'],
};

