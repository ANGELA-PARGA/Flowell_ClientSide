import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export async function middleware(req) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

        // Protege rutas de la cuenta
        if (!token && (pathname.startsWith('/account') || 
            !token && pathname.startsWith('/checkout'))){
            return NextResponse.redirect(new URL('/login', req.url));
        }

        // Redirige si el usuario está autenticado y trata de acceder a /login o /register
        if (token && (pathname === '/login' || pathname === '/register') || pathname.startsWith('/recover_password')) {
            return NextResponse.redirect(new URL('/', req.url));
        }
}

export const config = {
    matcher: ['/account/:path*',  '/checkout', '/login', '/register', '/recover_password'],
};

