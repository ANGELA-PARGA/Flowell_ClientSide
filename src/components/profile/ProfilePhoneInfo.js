import styles from './components.module.css'
import MyModalDelete from '@/UI/MyModalDelete';
import MyModalEdit from '@/UI/MyModalUpdate';
import MyModalAdd from '@/UI/MyModalAdd';

export default function ProfilePhoneInfo({userData}) {

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
                                <MyModalEdit resourceId={phone.phoneID} resourceType={'contact_inf'} resource={phone}/>
                                <MyModalDelete type={'Contact'} resourceId={phone.phoneID} resourceType={'contact_inf'}/>     
                            </div>
                        </li>
                        ))}
                    </ul>
                    ) : (
                        <>
                        <p className={styles.notUserInfoMessage}>You don't have any phone numbers, please add a phone number</p>
                        <MyModalAdd resourceType={'contact_inf'}/> 
                        </>
                    )}
                </div>
                <div>
                    {
                        userData.user.phones && userData.user.phones.length < 2 
                        ? <MyModalAdd resourceType={'contact_inf'}/> 
                        : null
                    }
                </div>
            </div>
        </section>         
        </>
    );        
}