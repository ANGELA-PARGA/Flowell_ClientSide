
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const isProduction = process.env.NODE_ENV === 'production';

const getConnectSidFromHeaders = (response) => {
    if (typeof response.headers?.getSetCookie === 'function') {
        const cookiesFromHeader = response.headers.getSetCookie();
        const connectSidCookie = cookiesFromHeader.find((cookie) => cookie.startsWith('connect.sid='));
        if (connectSidCookie) {
            return connectSidCookie.split(';')[0].split('=')[1];
        }
    }

    const rawSetCookie = response.headers?.get('set-cookie');
    if (!rawSetCookie) {
        return null;
    }

    const connectSidMatch = rawSetCookie.match(/connect\.sid=([^;]+)/i);
    return connectSidMatch?.[1] ?? null;
};


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "Enter your email" },
                password: { label: "password", type: "password", placeholder: "**********"  },
            },
            async authorize(credentials) {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password,
                            }),
                            headers: { "Content-Type": "application/json" },
                            credentials: "include",
                        }
                    );
                    if(!response.ok){
                        const parsedError = await response.json();
                        throw new Error(parsedError.error)
                        
                    }
                    if(response.ok){
                        const userRetrieved = await response.json();

                        const connectSidValue = getConnectSidFromHeaders(response);
                        if (!connectSidValue) {
                            throw new Error('Authentication cookie was not provided by the backend');
                        }

                        const allCookies = await cookies();
                        allCookies.set({
                            name: 'connect.sid',
                            value: connectSidValue,
                            httpOnly: true,
                            maxAge: 24 * 60 * 60,
                            path: '/',
                            sameSite: 'lax',
                            secure: isProduction,
                        });
                        
                        /*returning the user for the session information*/
                        const user = {
                            id: userRetrieved.user.id,
                            email: userRetrieved.user.email,
                            username: `${userRetrieved.user.first_name} ${userRetrieved.user.last_name}`,
                            cart_id: userRetrieved.user.cart_id,
                            role: userRetrieved.user.role
                        }          
                        return user 
                    }                            
                } catch (error) {
                    console.error('Authorization error:', error);
                    throw (error instanceof Error ? error : new Error(String(error)));                        
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    jwt:{
        maxAge: 24 * 60 * 60,
    },
    // these callbacks are used to include the user information in the token and session, 
    // so we can access it across the app without needing to fetch it again
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.cart_id = user.cart_id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.username = token.username;
            session.user.cart_id = token.cart_id;
            session.user.role = token.role;
            return session;
        }
    },
};


