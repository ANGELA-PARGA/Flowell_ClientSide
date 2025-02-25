import styles from './components.module.css'
import MyModalEdit from '@/UI/MyModalUpdate';
import MyModalChangePassword from '@/UI/MyModalChangePassword';

export default async function ProfilePersonalInfo({userData}) {
    return (
        <>
        <section className={styles.profile_info_container}>
            <div className={styles.profile_info_subcontainer}>
                <h3>Personal information</h3>
                <div className={styles.profile_info_details_container}>
                    <div>
                        <p>First name:<span> {userData.user.first_name}</span></p>
                        <p>Last name:<span> {userData.user.last_name}</span></p>
                    </div>
                    <MyModalEdit resourceId={userData.user.id} resourceType={'personal_inf'} resource={{
                            firstName: userData.user.first_name,
                            lastName: userData.user.last_name
                    }}/>        
                </div>
                <div className={styles.profile_info_details_container}>
                    <p>Email:<span> {userData.user.email}</span></p>
                    <MyModalChangePassword/>
                </div>
            </div>
        </section>
        </>
    );        
}