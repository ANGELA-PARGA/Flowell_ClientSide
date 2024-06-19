'use client'

import styles from './components.module.css'
import Link from 'next/link';
import AddAddressForm from './information_forms/AddAddressForm';
import { useSearchParams } from 'next/navigation';
import { deletePersonalInfo } from '@/_utilities/userRequests';


export default function ProfileAddressInfo({userData, resourceType}) {
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
        { !add ? 
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
                                        <Link href={`/account/profile/address_inf/${address.addressID}`}><button>edit address</button></Link>
                                        <button onClick={(event)=> onDelete(address.addressID, event)}>delete address</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.notUserInfoMessage}>You don't have any addresses, please add an address</p>
                    )}
                    <div>
                        <Link href={`/account/profile/address_inf?add=true`}><button >Add address</button></Link>
                    </div>
                </div>
            </div>
        </section>        
        :
        <div>
            <AddAddressForm resourceType={resourceType}/>
        </div>
        }
        </>
    );        
}