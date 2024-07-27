
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    // Protege rutas de la cuenta
    if (!token && pathname.startsWith('/account')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Redirige si el usuario está autenticado y trata de acceder a /login o /signup
    if (token && (pathname === '/login' || pathname === '/signup')) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    }

export const config = {
    matcher: ['/account/:path*', '/login', '/signup'],
};

