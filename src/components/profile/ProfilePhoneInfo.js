'use client'

import styles from './components.module.css'
import dynamic from 'next/dynamic'
import { PHONE_RESOURCE } from '@/const'

const MyModalDelete = dynamic(() => import('@/UI/MyModalDelete'))
const MyModalAdd = dynamic(() => import('@/UI/MyModalAdd'))
const MyModalEdit = dynamic(() => import('@/UI/MyModalEdit'))

/**
 * Profile Phone Information Component
 * Receives phones from Redux via props from parent
 */
export default function ProfilePhoneInfo({ phones }) {
    return (
        <>
        <section className={styles.profile_info_container}>
            <div className='flex-col-gap'>
                <h3>Phone numbers</h3>
                <div>
                    {phones && phones.length > 0 ? (
                    <ul className={styles.subcontainer_info_details}>
                        {phones.map((phone) => (
                        <li key={phone.id || phone.tempId} className={`${styles.profile_info_details_container} flex-col-gap`}>
                            <p>{phone.phone}</p>
                            <div className={styles.profile_info_edition_buttons}>
                                <MyModalEdit resourceId={phone.id || phone.tempId} 
                                            resourceType={PHONE_RESOURCE} 
                                            resource={{ phone: phone.phone }} 
                                />
                                <MyModalDelete type={'Contact'} 
                                            resourceId={phone.id || phone.tempId} 
                                            resourceType={PHONE_RESOURCE}
                                />     
                            </div>
                        </li>
                        ))}
                    </ul>
                    ) : (
                        <>
                        <p className={styles.notUserInfoMessage}>You don't have any phone numbers, please add a phone number</p>
                        <MyModalAdd resourceType={PHONE_RESOURCE}/> 
                        </>
                    )}
                </div>
                <div>
                    {
                        phones && phones.length < 2 
                        ? <MyModalAdd resourceType={PHONE_RESOURCE}/> 
                        : null
                    }
                </div>
            </div>
        </section>         
        </>
    );        
}