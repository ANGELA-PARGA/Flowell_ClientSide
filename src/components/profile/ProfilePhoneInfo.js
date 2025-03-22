import styles from './components.module.css'
import dynamic from 'next/dynamic'

const MyModalDelete = dynamic(() => import('@/UI/MyModalDelete'))
const MyModalAdd = dynamic(() => import('@/UI/MyModalAdd'))
const MyModalEdit = dynamic(() => import('@/UI/MyModalUpdate'))

export default function ProfilePhoneInfo({userData}) {
    return (
        <>
        <section className={styles.profile_info_container}>
            <div className={styles.profile_info_subcontainer}>
                <h3>Phone numbers</h3>
                <div>
                    {userData && userData.length > 0 ? (
                    <ul className={styles.subcontainer_info_details}>
                        {userData.map((phone) => (
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
                        userData && userData.length < 2 
                        ? <MyModalAdd resourceType={'contact_inf'}/> 
                        : null
                    }
                </div>
            </div>
        </section>         
        </>
    );        
}