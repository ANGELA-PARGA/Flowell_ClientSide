require('dotenv').config({ path: 'api.env' });
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";


const handler = NextAuth({
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
                            }
                        );
                        if(!response.ok){
                            const parsedError = await response.json();
                            console.log('error in login', parsedError)
                            throw new Error(parsedError.error)
                            
                        }
                        if(response.ok){
                            const userRetrieved = await response.json();
                            
                            /*setting the cookie manually to the browser*/
                            const apiCookies = response.headers.get('Set-Cookie');
                            const cookieParts = apiCookies.split(';');
                            const cookieObject = {};
                            cookieParts.forEach(part => {
                                const [key, value] = part.trim().split('=');
                                const name = key.split('.')[0];
                                if (name && value) {
                                    cookieObject[name.trim()] = value.trim();
                                }
                            });
                            cookies().set({
                                name: 'connect.sid',
                                value: cookieObject['connect'],
                                httpOnly: true,
                                maxAge: 24 * 60 * 60 * 1000,
                                path: cookieObject['Path'],
                                sameSite: false,
                                expires: new Date(cookieObject['Expires']),
                                secure: false,
                            });
                            
                            /*returning the user for the session information*/
                            const user = {
                                id: userRetrieved.user.id,
                                email: userRetrieved.user.email,
                                username: `${userRetrieved.user.first_name} ${userRetrieved.user.last_name}`,
                                cart_id: userRetrieved.user.cart_id
                            }  
                            console.log('user for session:', user)        
                            return user 
                        }                            
                    } catch (error) {
                        console.error('Authorization error:', error);
                        throw new Error(error);                        
                    }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        jwt: true,
        maxAge: 24 * 60 * 60, 
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.cart_id = user.cart_id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.username = token.username;
            session.user.cart_id = token.cart_id;
            return session;
        }
    },
});

export { handler as GET, handler as POST };
