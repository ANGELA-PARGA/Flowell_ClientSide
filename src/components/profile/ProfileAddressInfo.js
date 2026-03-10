'use client'

import styles from './components.module.css'
import dynamic from 'next/dynamic'
import { ADDRESS_RESOURCE } from '@/const';

const MyModalDelete = dynamic(() => import('@/UI/MyModalDelete'))
const MyModalAdd = dynamic(() => import('@/UI/MyModalAdd'))
const MyModalEdit = dynamic(() => import('@/UI/MyModalEdit'))

/**
 * Profile Address Information Component
 * Receives addresses from Redux via props from parent
 */
export default function ProfileAddressInfo({ addresses }) {    
    return (
        <>
        <section className={styles.profile_info_container}>
            <div className='flex-col-gap'>
                <h3>Addresses</h3>
                <div className='flex-col-gap'>
                    {addresses && addresses.length > 0 ? (                        
                    <ul className={styles.subcontainer_info_details}>
                        {addresses.map((address) => (
                        <li key={address.id} className={`${styles.profile_info_details_container} flex-col-gap`}>
                            <div >
                                <p>{address.address}</p>
                                <p>{address.city}</p>
                                <p>{address.state}</p>
                                <p>{address.zip_code}</p>
                            </div>
                            <div className={styles.profile_info_edition_buttons}>
                                <MyModalEdit resourceId={address.id} 
                                            resourceType={ADDRESS_RESOURCE} 
                                            resource={
                                                { 
                                                    address: address.address, 
                                                    city: address.city, 
                                                    state: address.state, 
                                                    zip_code: address.zip_code 
                                                }
                                            }
                                />
                                <MyModalDelete type={ADDRESS_RESOURCE} 
                                                resourceId={address.id} 
                                                resourceType={ADDRESS_RESOURCE} 
                                />
                            </div>
                        </li>))}
                    </ul>
                    ) : (
                        <>
                        <p className={styles.notUserInfoMessage}>You don't have any addresses, please add an address</p>
                        <MyModalAdd resourceType={ADDRESS_RESOURCE}/> 
                        </>
                    )}
                    <div>
                        {
                            addresses && addresses.length < 2 ?
                            <MyModalAdd resourceType={ADDRESS_RESOURCE}/> 
                            : null
                        }
                    </div>                  
                </div>
            </div>
        </section>       
        </>
    );        
}