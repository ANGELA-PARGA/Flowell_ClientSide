"use client";

import { SessionProvider } from "next-auth/react";

const SessionAuthProvider = ({ children, session }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default SessionAuthProvider;
