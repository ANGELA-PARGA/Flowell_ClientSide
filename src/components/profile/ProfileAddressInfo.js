import styles from './components.module.css'
import MyModalDelete from '@/UI/MyModalDelete';
import MyModalEdit from '@/UI/MyModalUpdate';
import MyModalAdd from '@/UI/MyModalAdd';

export default function ProfileAddressInfo({userData}) {    

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
                                <MyModalEdit resourceId={address.addressID} resourceType={'address_inf'} resource={address}/>
                                <MyModalDelete type={'Address'} 
                                                resourceId={address.addressID} 
                                                resourceType={'address_inf'} 
                                />
                            </div>
                        </li>))}
                    </ul>
                    ) : (
                        <p className={styles.notUserInfoMessage}>You don't have any addresses, please add an address</p>
                    )}
                    <div>
                        {
                            userData.user.addresses && userData.user.addresses.length < 2 ?
                            <MyModalAdd resourceType={'address_inf'}/> 
                            : null
                        }
                    </div>                  
                </div>
            </div>
        </section>       
        </>
    );        
}