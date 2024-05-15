'use client'
import styles from './components.module.css'
import Link from 'next/link';
import { useState } from 'react';
import AddPaymentForm from './AddPaymentForm';

export default function ProfilePaymentInfo({userData, resourceType}) {
    const [showForm, setShowForm] = useState(false);
    
    return (
        <>
        <section className={styles.profile_info_container}>
            <div className={styles.profile_info_subcontainer}>
                <h3>Credit cards</h3>
                <div>
                    {userData.user.credit_cards.length > 0 ? (
                        <ul className={styles.subcontainer_info_details}>
                            {userData.user.credit_cards.map((card) => (
                                <li key={card.creditcardID} className={styles.profile_info_details_container}>
                                    <div>
                                        <p>{card.credit_card}</p>
                                        <p>{card.holder}</p>
                                        <p>{card.expiration_date}</p>
                                    </div>
                                    <div className={styles.profile_info_edition_buttons}>
                                        <Link href={`/account/profile/payment_inf/${card.creditcardID}`}><button>edit card</button></Link>
                                        <button>delete card</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.notUserInfoMessage}>You don't have any credit cards, please add a credit card</p>
                    )}
                </div>
                {
                    !showForm ?
                    <div >
                        <button onClick={() => setShowForm(true)}>Add credit card</button>
                    </div> : <></>
                }
            </div>
            { showForm ? 
            <div>
                <AddPaymentForm resourceType={resourceType}/>
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