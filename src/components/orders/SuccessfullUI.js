import styles from './components.module.css'
import Link from 'next/link';

const SuccessfullUI = () => {
    return(
        <section className={styles.order_details_subcontainer}>
            <h3>You order was placed succesfully</h3>
            <div className={styles.order_details_buttons}>
                <Link href={'/'}><button type="button">Continue shopping</button></Link>
                <Link href={'/account/orders'}><button type="button">Go to orders</button></Link>
            </div> 
        </section>
    )
};

export default SuccessfullUI;