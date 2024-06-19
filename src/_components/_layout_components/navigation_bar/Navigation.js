'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './components.module.css';
import DropdownMenu from './DropdownMenu';
import DropdownAuth from './DropdownAuth';
import DropdownAuthUser from './DropdownAuthUser';
import { useSession } from 'next-auth/react';
import { LeafIconNavBar, UserIconNavBar, CartIconNavBar, MenuIconNavBar, CloseIcon, SearchIconNavBar, ChevronDownNavBar } from '../../../../public/svgIcons';

const Navigation = () => {
    const [active, setActive] = useState('');
    const [showingMenu, setShowingMenu] = useState('');
    const { data: session } = useSession();

    function handleToggle(linkName) {
        if (active === linkName) {
            setActive('');
            setShowingMenu('');
        } else {
            setActive(linkName);
            setShowingMenu(linkName);
        }
    }

    function handleOnMouseEnter(linkName) {
        setActive(linkName);
        setShowingMenu(linkName);
    }

    function handleOnMouseLeave() {
        setActive('');
        setShowingMenu('');
    }

    return (
        <>
        <nav className={`${styles.navbar} ${styles.large_screen_navbar}`} >
            <div className={styles.logo_container}>
                <Link href="/" className={styles.logo}>
                    <LeafIconNavBar width={40} height={40} weight={2} />
                </Link>
            </div>
            <ul className={styles.navbar_options}>
                <li
                    className={`${styles.menu_button_li} ${styles.menu_button_primary}`}
                    onMouseLeave={handleOnMouseLeave} onClick={() => handleToggle('products')}
                >
                    <div className={styles.menu_button} onMouseEnter={() => handleOnMouseEnter('products')}>
                        <span>Products</span>
                        <div id={styles.arrow_down}>
                            <ChevronDownNavBar width={16} height={16} weight={3} />
                        </div>
                    </div>
                    {showingMenu === 'products' && (
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownMenu linkActive={active} />
                        </div>
                    )}
                </li>
                <li
                    className={`${styles.menu_button_li} ${styles.menu_button_primary}`}
                    onMouseLeave={handleOnMouseLeave} onClick={() => handleToggle('services')}
                >
                    <div className={styles.menu_button} onMouseEnter={() => handleOnMouseEnter('services')}>
                        <span>Flowell</span>
                        <div id={styles.arrow_down}>
                            <ChevronDownNavBar width={16} height={16} weight={3} />
                        </div>
                    </div>
                    {showingMenu === 'services' && (
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownMenu linkActive={active} />
                        </div>
                    )}
                </li>
            </ul>
            <form action="." className={styles.search_container}>
                <input type="text" placeholder="Search" />
            </form>
            <ul className={styles.navbar_options}>
                <li
                    className={`${styles.menu_button_li} ${styles.menu_button_primary}`}
                    onMouseLeave={handleOnMouseLeave} onClick={() => handleToggle('sign_in')}
                >
                    <div className={styles.menu_button} onMouseEnter={() => handleOnMouseEnter('sign_in')}>
                        <div className={styles.auth_button}>
                            <UserIconNavBar width={22} height={22} weight={2} />
                            {!session?.user?.email ? <span>Sign In</span> : <span>Account</span>}
                        </div>
                        <div id={styles.arrow_down} >
                            <ChevronDownNavBar width={16} height={16} weight={3} />
                        </div>
                    </div>
                    {showingMenu === 'sign_in' && (
                        <div className={styles.dropdown_menu_display_show}>
                            {session?.user?.email ? <DropdownAuthUser linkActive={active} /> : <DropdownAuth linkActive={active} />}
                        </div>
                    )}
                </li>
                <li
                    className={`${styles.menu_button_li} ${styles.menu_button_primary}`}
                    onMouseLeave={handleOnMouseLeave} onClick={() => handleToggle('cart')}
                >
                    <div className={styles.menu_button} onMouseEnter={() => handleOnMouseEnter('cart')}>
                        <div className={styles.auth_button}>
                            <CartIconNavBar width={22} height={22} weight={2} />
                            <span>Cart</span>
                        </div>
                        <div id={styles.arrow_down}>
                            <ChevronDownNavBar width={16} height={16} weight={3} />
                        </div>
                    </div>
                    {showingMenu === 'cart' && (
                        <div className={styles.dropdown_menu_display_show}>
                            {session?.user?.email ? <DropdownAuthUser linkActive={active} /> : <DropdownAuth linkActive={active} />}
                        </div>
                    )}
                </li>
            </ul>
        </nav>

        <nav className={`${styles.navbar} ${styles.small_screen_navbar}`}>
            <div className={styles.logo_container}>
                <Link href="/" className={styles.logo}>
                    <LeafIconNavBar width={40} height={40} weight={2} />
                </Link>
            </div>
            <ul className={styles.navbar_options}>
                <li
                    className={`${styles.menu_button_li} ${styles.menu_button_secondary}`}
                    onClick={() => handleToggle('menu')}
                >
                    <div className={styles.menu_button}>
                        {showingMenu === 'menu' ? <CloseIcon width={22} height={22} weight={2} /> : <MenuIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'menu' && (
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownMenu linkActive={active} />
                        </div>
                    )}
                </li>
                <li
                    className={`${styles.menu_button_li} ${styles.menu_button_secondary}`}
                    onClick={() => handleToggle('sign_in')}
                >
                    <div className={styles.menu_button}>
                        {showingMenu === 'sign_in' ? <CloseIcon width={22} height={22} weight={2} /> : <UserIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'sign_in' && (
                        <div className={styles.dropdown_menu_display_show}>
                            {session?.user?.email ? <DropdownAuthUser linkActive={active} /> : <DropdownAuth linkActive={active} />}
                        </div>
                    )}
                </li>
                <li
                    className={`${styles.menu_button_li} ${styles.menu_button_secondary}`}
                    onClick={() => handleToggle('cart')}
                >
                    <div className={styles.menu_button}>
                        {showingMenu === 'cart' ? <CloseIcon width={22} height={22} weight={2} /> : <CartIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'cart' && (
                        <div className={styles.dropdown_menu_display_show}>
                            {session?.user?.email ? <DropdownAuthUser linkActive={active} /> : <DropdownAuth linkActive={active} />}
                        </div>
                    )}
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_secondary}`}>
                    <div className={styles.menu_button} onClick={() => handleToggle('search')}>
                        {showingMenu === 'search' ? <CloseIcon width={22} height={22} weight={2} /> : <SearchIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'search' && (
                        <div className={styles.dropdown_menu}>
                            <form action="." className={styles.search_container}>
                            <input type="text" placeholder="Search" />
                            </form>
                        </div>
                    )}
                </li>
            </ul>  
        </nav>

        </>
    );
};

export default Navigation;
