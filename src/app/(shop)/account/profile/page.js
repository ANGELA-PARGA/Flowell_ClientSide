import ProfilePersonalInfo from "@/components/profile/ProfilePersonalInfo";
import ProfileAddressInfo from "@/components/profile/ProfileAddressInfo";
import ProfilePhoneInfo from "@/components/profile/ProfilePhoneInfo";
import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";
import styles from '../page.module.css'
import dynamic from 'next/dynamic'

const MyModalLogin = dynamic(()=> import("@/UI/MyModalLogin"))

export default async function Profile() {
    
    const {data, expired} = await fetchAllUserInfo();

    if (expired) {
        console.log('data is expired on PROFILE server component')
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

