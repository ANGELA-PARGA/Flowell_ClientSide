'use client'

import styles from './components.module.css'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AddPhoneForm from './AddPhoneForm';
import { deletePersonalInfo } from '@/_utilities/userRequests';

export default function ProfilePhoneInfo({userData, resourceType}) {
    const searchParams = useSearchParams();
    const add = searchParams.get('add') === 'true';

    const onDelete = async (resourceId, event) => {
        event.preventDefault();
        try {
            await deletePersonalInfo(resourceType, resourceId);
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
        }             
    };

    return (
        <>
        {!add ?
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
                                        <Link href={`/account/profile/contact_inf/${phone.phoneID}`}><button>edit phone</button></Link>
                                        <button onClick={(event)=> onDelete(phone.phoneID, event)}>delete phone</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.notUserInfoMessage}>You don't have any phone numbers, please add a phone number</p>
                    )}
                </div>
                <div>
                    <Link href={`/account/profile/contact_inf?add=true`}><button>Add phone</button></Link>
                </div>
            </div>
        </section>         
        :
        <div>
            <AddPhoneForm resourceType={resourceType}/> 
        </div>
        }
        </>
    );        
}