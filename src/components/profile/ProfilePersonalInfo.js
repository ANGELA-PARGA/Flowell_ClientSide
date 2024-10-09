'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import styles from './components.module.css'
import UpdateProfileInfo from '../forms/UpdateProfileInfo';

export default function ProfilePersonalInfo({userData}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleOnClickEditName = (e) =>{
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('edit', 'name');
        router.replace(`?${currentParams.toString()}`);
    }


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
                    <button type='button' onClick={(e) => handleOnClickEditName(e)}>Edit Name</button>
                    {
                        searchParams.get('edit') === 'name' &&
                        <UpdateProfileInfo resourceId={userData.user.id} resourceType={'personal_inf'} name={{
                            firstName: userData.user.first_name,
                            lastName: userData.user.last_name
                        }}/>
                    } 
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