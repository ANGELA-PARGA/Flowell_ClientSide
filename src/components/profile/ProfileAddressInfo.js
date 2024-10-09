'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { useRef } from 'react';
import styles from './components.module.css'
import ButtonDelete from '@/UI/ButtonDelete';
import UpdateAddressInfo from '../forms/UpdateAddressInfo';
import AddAddressForm from '../forms/AddAddressForm';

export default function ProfileAddressInfo({userData}) {    
    const searchParams = useSearchParams();
    const router = useRouter();
    const formRef = useRef(null);

    const handleOnClickEditAddress = (e, addressID) =>{
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('edit', 'address');
        currentParams.set('addressID', addressID);
        router.replace(`?${currentParams.toString()}`);
    }


    const handleOnClickAddAddress = (e) =>{
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('add', 'address'); 
        router.replace(`?${currentParams.toString()}`);
    }

    setTimeout(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
            window.scrollBy(0, -73);
        }
    }, 100); 

    return (
        <>
        <section className={styles.profile_info_container}>
            <div className={styles.profile_info_subcontainer}>
                <h3>Addresses</h3>
                <div className={styles.profile_addresses_subcontainer}>
                    {userData.user.addresses && userData.user.addresses.length > 0 ? (                        
                        <ul className={styles.subcontainer_info_details}>
                            {userData.user.addresses.map((address) => (
                                <li key={address.addressID} className={styles.profile_info_details_container}>
                                    <div >
                                        <p>{address.address}</p>
                                        <p>{address.city}</p>
                                        <p>{address.state}</p>
                                        <p>{address.zip_code}</p>
                                    </div>
                                    <div className={styles.profile_info_edition_buttons}>
                                        <button type='button' onClick={(e) => handleOnClickEditAddress(e, address.addressID)}>Edit</button> 
                                        <ButtonDelete type={'Address'} resourceId={address.addressID} resourceType={'address_inf'}/>
                                    </div>
                                    {
                                        searchParams.get('edit') === 'address' && searchParams.get('addressID') === String(address.addressID) &&
                                        <>
                                        <div ref={formRef}></div>
                                        <UpdateAddressInfo resourceId={address.addressID} resourceType={'address_inf'} address={address}/>
                                        </>
                                    }
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.notUserInfoMessage}>You don't have any addresses, please add an address</p>
                    )}
                    <div>
                        {
                            userData.user.addresses && userData.user.addresses.length < 2 ?
                            <button type='button' onClick={(e) => handleOnClickAddAddress(e)}>Add address</button> 
                            : null
                        }
                    </div>
                    {
                        searchParams.get('add') === 'address' &&
                        <>
                        <div ref={formRef}></div>
                        <AddAddressForm resourceType={'address_inf'}/>
                        </>
                    }                    
                </div>
            </div>
        </section>       
        </>
    );        
}