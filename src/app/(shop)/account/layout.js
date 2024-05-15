import Link from "next/link";
import styles from './page.module.css'
import ButtonLogOut from "@/_components/_elements/ButtonLogOut";

export default function AccountLayout({ children }) {
  return (
    <section className={styles.dashboard}>
      <div className={styles.sidebar}>
        <h1>My account</h1>
        <ul className={styles.sidebar_list_options}>
          <li><Link href={'/account/profile/personal_inf'}>Personal Info</Link></li>
          <li><Link href={'/account/profile/address_inf'}>My addresses</Link></li>
          <li><Link href={'/account/profile/contact_inf'}>My phones</Link></li>
          <li><Link href={'/account/profile/payment_inf'}>My credit cards</Link></li>
          <li><Link href={'/account/orders'}>My orders</Link></li>
          <li><Link href={'/account/cart'}>My cart</Link></li>
          <li><ButtonLogOut/></li>      
        </ul>
      </div>
      <div className={styles.info_dashboard}>
        {children}
      </div>
    </section>
  );
}
