import styles from './components.module.css'
import { OrdersIcon, FlightIcon } from '../../../public/svgIcons';
import Link from 'next/link';



export default function BannerInformative() {
    return (
        <div className={styles.banner_informative_container}>
            <h3 >Become a member</h3>
            <div className={styles.banner_informative_information}>
                <div className={styles.banner_info}>
                    <p>International Shipping from South America to your business</p>
                    <FlightIcon weight={1.5} height={48} width={48}/>
                </div>
                <div className={styles.banner_info}>
                    <p>Competitive prices on Bulk Shipments</p>
                    <OrdersIcon weight={1.5} height={48} width={48}/>
                </div>
                <div className={styles.banner_info_registration}>
                    <p>Not a member yet?</p>
                    <Link href='/register'>Register here</Link>
                </div>
            </div>             
        </div>
    );
}
