import styles from './components.module.css'
import dynamic from 'next/dynamic'

const MyModalEdit = dynamic(() => import('@/UI/MyModalUpdate'))
const MyModalChangePassword = dynamic(() => import('@/UI/MyModalChangePassword'))

export default async function ProfilePersonalInfo({userData}) {
    return (
        <>
        <section className={styles.profile_info_container}>
            <div className='flex-col-gap'>
                <h3>Personal information</h3>
                <div className={`${styles.profile_info_details_container} flex-col-gap`}>
                    <div>
                        <p>First name:<span> {userData.first_name}</span></p>
                        <p>Last name:<span> {userData.last_name}</span></p>
                    </div>
                    <MyModalEdit resourceId={userData.id} resourceType={'personal_inf'} resource={{
                            firstName: userData.first_name,
                            lastName: userData.last_name
                    }}/>        
                </div>
                <div className={`${styles.profile_info_details_container} flex-col-gap`}>
                    <p>Email:<span> {userData.email}</span></p>
                    <MyModalChangePassword/>
                </div>
            </div>
        </section>
        </>
    );        
}