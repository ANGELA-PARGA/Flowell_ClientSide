'use client'
import styles from './components.module.css'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AddPaymentForm from './AddPaymentForm';
import { deletePersonalInfo } from '@/_utilities/userRequests';

export default function ProfilePaymentInfo({userData, resourceType}) {
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
                <h3>Credit cards</h3>
                <div>
                    {userData.user.credit_cards && userData.user.credit_cards.length > 0 ? (
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
                                        <button onClick={(event)=> onDelete(card.creditcardID, event)}>delete card</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.notUserInfoMessage}>You don't have any credit cards, please add a credit card</p>
                    )}
                </div>
                <div >
                    <Link href={`/account/profile/payment_inf?add=true`}><button>Add credit card</button></Link>
                </div>
            </div>
        </section>        
        :
        <div>
            <AddPaymentForm resourceType={resourceType}/> 
        </div>
        }
        </>
    );        
}