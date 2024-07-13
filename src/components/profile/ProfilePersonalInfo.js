import styles from './components.module.css'
import Link from 'next/link';

export default function ProfilePersonalInfo({userData}) {
    
    return (
        <>
        <section className={styles.profile_info_container}>
            <h2>My Profile</h2>
            <div className={styles.profile_info_subcontainer}>
                <h3>Personal information</h3>
                <div className={styles.profile_info_details_container}>
                    <div>
                        <p>First name:<span> {userData.user.first_name}</span></p>
                        <p>Last name:<span> {userData.user.last_name}</span></p>
                    </div>
                    <Link href={`/account/profile/personal_inf/${userData.user.id}`}><button>edit name</button></Link>
                </div>
                <div className={styles.profile_info_details_container}>
                    <p>Email:<span> {userData.user.email}</span></p>
                    <button>Change password</button>
                </div>
            </div>
        </section>
        </>
    );        
}