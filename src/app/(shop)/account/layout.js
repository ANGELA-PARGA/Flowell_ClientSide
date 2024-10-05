import Link from "next/link";
import styles from './page.module.css'
import ButtonLogOut from "@/UI/ButtonLogOut";
import { UserIcon, CartIcon, OrdersIcon, PhonesIcon, AddressIcon, CreditCardIcon } from "../../../../public/svgIcons";

export default function AccountLayout({ children }) {
  const sidebarLinks = [
    {
      name: 'Profile Information',
      href: '/account/profile/personal_inf',
      icon: <UserIcon width={28} height={28} weight={2}/>
    },
    {
      name: 'My addresses',
      href: '/account/profile/address_inf',
      icon: <AddressIcon width={28} height={28} weight={2}/>
    },
    {
      name: 'My phones',
      href: '/account/profile/contact_inf',
      icon: <PhonesIcon width={28} height={28} weight={2}/>
    },
    {
      name: 'My orders',
      href: '/account/orders',
      icon: <OrdersIcon width={28} height={28} weight={2}/>
    },
    {
      name: 'My cart',
      href: '/account/cart',
      icon: <CartIcon width={28} height={28} weight={2}/>
    }
  ]


  return (
    <section className={styles.dashboard}>
      <div className={styles.sidebar}>
        <h1>My account</h1>
        <ul className={styles.sidebar_list_options}>
          {sidebarLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  {link.icon}
                  <span className={styles.tooltip}>{link.name}</span>
                  <span className={styles.linkName}>{link.name}</span>
                </Link>
              </li>
            ))}
          <li>
            <ButtonLogOut/>
          </li>      
        </ul>
      </div>
      <div className={styles.info_dashboard}>
        {children}
      </div>
    </section>
  );
}
