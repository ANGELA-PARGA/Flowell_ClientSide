'use client'

import styles from './components.module.css'
import dynamic from 'next/dynamic'
import { PHONE_RESOURCE } from '@/components/forms/const'

const ModalDelete = dynamic(() => import('@/components/modals/ModalDelete'))
const ModalAdd = dynamic(() => import('@/components/modals/ModalAdd'))
const ModalUpdateUserInfo = dynamic(() => import('@/components/modals/ModalUpdateUserInfo'))

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
                                <ModalUpdateUserInfo 
                                    resourceId={phone.id || phone.tempId} 
                                    resourceType={PHONE_RESOURCE} 
                                    resource={{ phone: phone.phone }} 
                                />
                                <ModalDelete 
                                    type={PHONE_RESOURCE} 
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
                        <ModalAdd resourceType={PHONE_RESOURCE}/> 
                        </>
                    )}
                </div>
                <div>
                    {
                        phones && phones.length < 2 
                        ? <ModalAdd resourceType={PHONE_RESOURCE}/> 
                        : null
                    }
                </div>
            </div>
        </section>         
        </>
    );        
}