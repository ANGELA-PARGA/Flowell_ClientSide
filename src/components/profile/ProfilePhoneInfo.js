import styles from './components.module.css'
import Link from 'next/link';
import ButtonDelete from '@/UI/ButtonDelete';

export default function ProfilePhoneInfo({userData, resourceType}) {

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
                                        <Link href={`/account/profile/contact_inf/${phone.phoneID}`}><button>edit phone</button></Link>
                                        <ButtonDelete type={'Contact'} resourceId={phone.phoneID} resourceType={resourceType}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.notUserInfoMessage}>You don't have any phone numbers, please add a phone number</p>
                    )}
                </div>
                <div>
                    <Link href={`/account/profile/${resourceType}/add`}><button>Add phone</button></Link>
                </div>
            </div>
        </section>         
        </>
    );        
}