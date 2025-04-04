import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProfilePersonalInfo from "@/components/profile/ProfilePersonalInfo";
import ProfileAddressInfo from "@/components/profile/ProfileAddressInfo";
import ProfilePhoneInfo from "@/components/profile/ProfilePhoneInfo";
import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";
import styles from '../page.module.css'
import dynamic from 'next/dynamic'

const MyModalLogin = dynamic(()=> import("@/UI/MyModalLogin"))

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <MyModalLogin />;
    }
    
    const {data, expired} = await fetchAllUserInfo();

    if (expired) {
        return <MyModalLogin />;
    }
    
    
    return (
        <section className={styles.profile_main_container} >
            <ProfilePersonalInfo userData={data.user}/>
            <ProfileAddressInfo userData={data.user.addresses}/>
            <ProfilePhoneInfo userData={data.user.phones}/> 
        </section>        
    )
    
}

