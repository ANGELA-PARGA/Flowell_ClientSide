'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { useRef } from 'react';
import UpdatePhoneInfo from '../forms/UpdatePhoneInfo';
import AddPhoneForm from '../forms/AddPhoneForm';
import styles from './components.module.css'
import ButtonDelete from '@/UI/ButtonDelete';

export default function ProfilePhoneInfo({userData}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const formRef = useRef(null);

    const handleOnClickEditPhone = (e, phoneID) =>{
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('edit', 'phone');
        currentParams.set('phoneID', phoneID);
        router.replace(`?${currentParams.toString()}`);
    }

    const handleOnClickAddPhone = (e) =>{
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('add', 'phone'); 
        router.replace(`?${currentParams.toString()}`);
    }

    setTimeout(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth'});
            window.scrollBy(0, -73);
        }
    }, 100); 

    return (
        <>
        <section className={styles.profile_info_container}>
            <div className={styles.profile_info_subcontainer}>
                <h3>Phone numbers</h3>
                <div>
                    {userData.user.phones && userData.user.phones.length > 0 ? (
                        <ul className={styles.subcontainer_info_details}>
                            {userData.user.phones.map((phone) => (
                                <li key={phone.phoneID} className={styles.profile_info_details_container}>
                                    <p>{phone.phone}</p>
                                    <div className={styles.profile_info_edition_buttons}>
                                        <button type='button' onClick={(e) => handleOnClickEditPhone(e, phone.phoneID)}>Edit</button> 
                                        <ButtonDelete type={'Contact'} resourceId={phone.phoneID} resourceType={'contact_inf'}/>
                                    </div>
                                    {
                                        searchParams.get('edit') === 'phone' && searchParams.get('phoneID') === String(phone.phoneID) &&
                                        <>
                                        <div ref={formRef}></div>                                        
                                        <UpdatePhoneInfo resourceId={phone.phoneID} resourceType={'contact_inf'} phone={phone}/>
                                        </>                                  
                                    }
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.notUserInfoMessage}>You don't have any phone numbers, please add a phone number</p>
                    )}
                </div>
                <div>
                    {
                        userData.user.phones && userData.user.phones.length < 2 
                        ? <button type='button' onClick={(e) => handleOnClickAddPhone(e)}>Add phone</button>
                        : null
                    }
                </div>
                {
                    searchParams.get('add') === 'phone' &&
                    <>
                    <div ref={formRef}></div>                                        
                    <AddPhoneForm resourceType={'contact_inf'}/>
                    </>                                  
                }
            </div>
        </section>         
        </>
    );        
}