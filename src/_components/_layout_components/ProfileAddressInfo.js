'use client'

import styles from './components.module.css'
import Link from 'next/link';
import AddAddressForm from './AddAddressForm';
import { useState } from 'react';


export default function ProfileAddressInfo({userData, resourceType}) {
    const [showForm, setShowForm] = useState(false);
    
    return (
        <>
        <section className={styles.profile_info_container}>
            <div className={styles.profile_info_subcontainer}>
                <h3>Addresses</h3>
                <div className={styles.profile_addresses_subcontainer}>
                    {userData.user.addresses.length > 0 ? (
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
                                        <Link href={`/account/profile/address_inf/${address.addressID}`}><button>edit address</button></Link>
                                        <button>delete address</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.notUserInfoMessage}>You don't have any addresses, please add an address</p>
                    )}
                    { !showForm ? 
                        <div>
                            <button onClick={() => setShowForm(true)}>Add address</button>
                        </div> : <></>
                    }
                </div>
            </div>
            { showForm ? 
            <div>
                <AddAddressForm resourceType={resourceType}/>
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