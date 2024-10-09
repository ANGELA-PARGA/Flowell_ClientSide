import ProfilePersonalInfo from "@/components/profile/ProfilePersonalInfo";
import ProfileAddressInfo from "@/components/profile/ProfileAddressInfo";
import ProfilePhoneInfo from "@/components/profile/ProfilePhoneInfo";
import { fetchAllUserInfo } from "@/lib/fetchingUserInfo";
import styles from './page.module.css'

export default async function Profile() {    
    const data = await fetchAllUserInfo();
    
    return (
        <section className={styles.profile_main_container} >
            <ProfilePersonalInfo userData={data}/>
            <ProfileAddressInfo userData={data}/>
            <ProfilePhoneInfo userData={data}/> 
        </section>        
    )
    
}
