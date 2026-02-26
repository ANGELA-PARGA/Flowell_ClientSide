'use client'

import { useSelector } from 'react-redux';
import { selectUserId, selectUserFirstName, selectUserLastName, selectUserEmail } from '@/store/user/selectors';
import styles from './components.module.css'
import dynamic from 'next/dynamic'

const MyModalEdit = dynamic(() => import('@/UI/MyModalUpdate'))
const MyModalChangePassword = dynamic(() => import('@/UI/MyModalChangePassword'))

/**
 * Profile Personal Information Component
 * Now uses Redux selectors instead of props for data
 */
export default function ProfilePersonalInfo() {
    const userId = useSelector(selectUserId);
    const firstName = useSelector(selectUserFirstName);
    const lastName = useSelector(selectUserLastName);
    const email = useSelector(selectUserEmail);

    return (
        <>
        <section className={styles.profile_info_container}>
            <div className='flex-col-gap'>
                <h3>Personal information</h3>
                <div className={`${styles.profile_info_details_container} flex-col-gap`}>
                    <div>
                        <p>First name:<span> {firstName}</span></p>
                        <p>Last name:<span> {lastName}</span></p>
                    </div>
                    <MyModalEdit resourceId={userId} resourceType={'personal_inf'} resource={{
                            firstName: firstName,
                            lastName: lastName
                    }}/>        
                </div>
                <div className={`${styles.profile_info_details_container} flex-col-gap`}>
                    <p>Email:<span> {email}</span></p>
                    <MyModalChangePassword/>
                </div>
            </div>
        </section>
        </>
    );        
}