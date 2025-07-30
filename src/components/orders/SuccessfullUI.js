import styles from './components.module.css'
import Link from 'next/link';

const SuccessfullUI = () => {
    return(
        <section className={`${styles.order_details_subcontainer} flex-col-gap-sm`}>
            <h3>You order was placed succesfully</h3>
            <div className='flex-row-gap'>
                <Link href={'/'}><button type="button" className='btn_primary_standard btn_sizeM'>Continue shopping</button></Link>
                <Link href={'/account/orders'}><button type="button" className='btn_primary_standard btn_sizeM'>Go to orders</button></Link>
            </div> 
        </section>
    )
};

export default SuccessfullUI;