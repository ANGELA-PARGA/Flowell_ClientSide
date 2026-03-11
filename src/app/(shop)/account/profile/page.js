import { getSessionUser } from "@/lib/getSessionUser";
import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";
import ProfilePageClient from './ProfilePageClient';
import { redirect } from "next/navigation";

export default async function Profile() {
    const session = await getSessionUser();
    if (!session) {
        redirect('/login');
    }
    
    const {data, expired} = await fetchAllUserInfo();

    if (expired) {
        redirect('/login');
    }
    

    return <ProfilePageClient initialUserData={data.user} />;
}

