'use client'

import { useSelector } from 'react-redux';
import { selectUserId, selectUserFirstName, selectUserLastName, selectUserEmail } from '@/store/user/selectors';
import styles from './components.module.css'
import dynamic from 'next/dynamic'
import { NAME_RESOURCE, PASSWORD_RESOURCE } from '@/components/forms/const';

const ModalUpdateUserInfo = dynamic(() => import('@/components/modals/ModalUpdateUserInfo'))
const ModalChangePassword = dynamic(() => import('@/components/modals/ModalChangePassword'))

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
                    <ModalUpdateUserInfo 
                        resourceId={userId} 
                        resourceType={NAME_RESOURCE} 
                        resource={{
                            first_name: firstName,
                            last_name: lastName
                        }}
                    />        
                </div>
                <div className={`${styles.profile_info_details_container} flex-col-gap`}>
                    <p>Email:<span> {email}</span></p>
                    <ModalChangePassword
                        resourceType={PASSWORD_RESOURCE} 
                    />
                </div>
            </div>
        </section>
        </>
    );        
}