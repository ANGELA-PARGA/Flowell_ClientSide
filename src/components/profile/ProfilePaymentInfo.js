import styles from './components.module.css'
import Link from 'next/link';
import ButtonDelete from '@/UI/ButtonDelete';

export default function ProfilePaymentInfo({userData, resourceType}) {
    
    return (
        <>
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
                                        <ButtonDelete type={'Payment'} resourceId={card.creditcardID} resourceType={resourceType}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.notUserInfoMessage}>You don't have any credit cards, please add a credit card</p>
                    )}
                </div>
                <div >
                    <Link href={`/account/profile/${resourceType}/add`}><button>Add credit card</button></Link>
                </div>
            </div>
        </section>        
        </>
    );        
}