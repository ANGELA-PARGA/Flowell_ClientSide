import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
require('dotenv').config({ path: 'api.env' });
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
                            console.log(response)
                            const parsedError = await response.json();
                            throw new Error(parsedError.error)
                            
                        }
                        if(response.ok){
                            console.log('response ok')
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
                            }  
                            console.log('user for session:', user)        
                            return user
                            
                        }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        jwt: true,
        maxAge: 24 * 60 * 60 * 1000, 
    }
});

export { handler as GET, handler as POST };
