import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";
import ProfilePageClient from './ProfilePageClient';
import { redirect } from "next/navigation";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/login');
    }
    
    const {data, expired} = await fetchAllUserInfo();

    if (expired) {
        redirect('/login');
    }
    

    return <ProfilePageClient initialUserData={data.user} />;
}

