'use client'

import styles from './components.module.css'
import Link from 'next/link';
import { useState } from 'react';
import AddPhoneForm from './AddPhoneForm';

export default function ProfilePhoneInfo({userData, resourceType}) {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
        <section className={styles.profile_info_container}>
            <div className={styles.profile_info_subcontainer}>
                <h3>Phone numbers</h3>
                <div>
                    {userData.user.phones.length > 0 ? (
                        <ul className={styles.subcontainer_info_details}>
                            {userData.user.phones.map((phone) => (
                                <li key={phone.phoneID} className={styles.profile_info_details_container}>
                                    <p>{phone.phone}</p>
                                    <div className={styles.profile_info_edition_buttons}>
                                        <Link href={`/account/profile/contact_inf/${phone.phoneID}`}><button>edit phone</button></Link>
                                        <button>delete phone</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.notUserInfoMessage}>You don't have any phone numbers, please add a phone number</p>
                    )}
                </div>
                {
                    !showForm ? 
                    <div>
                        <button  onClick={() => setShowForm(true)}>Add phone</button>
                    </div> : <></>
                }
            </div>
            { showForm ? 
            <div>
                <AddPhoneForm resourceType={resourceType}/>
                <div>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                </div> 
            </div>                     
            : <></>
            }
        </section>
        </>
    );        
}