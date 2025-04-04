import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function getSessionUser() {
    /* @next-codemod-ignore */
    const session = await getServerSession(authOptions);
    return session;
}
