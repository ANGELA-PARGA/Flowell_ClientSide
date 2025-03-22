'use client'

import Link from "next/link";
import styles from './page.module.css'
import ButtonLogOut from "@/UI/ButtonLogOut";
import { UserIcon, CartIcon, OrdersIcon } from "../../../../public/svgIcons";
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Suspense } from "react";
import LoadingOrders from "@/UI/LoadingOrders";

export default function AccountLayout({ children }) {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      name: 'Profile',
      href: '/account/profile',
      icon: <UserIcon width={28} height={28} weight={2}/>
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
        <ul className={styles.sidebar_list_options}>
          {sidebarLinks.map((link, index) => (
              <li key={index} className={clsx({[styles.active]: pathname === link.href})}>
                <Link href={link.href} prefetch={true}>
                  {link.icon}
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
        <Suspense fallback={<LoadingOrders/>}>
          {children}
        </Suspense>
      </div>
    </section>
  );
}
