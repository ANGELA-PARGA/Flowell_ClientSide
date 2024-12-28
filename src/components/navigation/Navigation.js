'use client'

import { useState, } from 'react';
import Link from 'next/link';
import styles from './components.module.css';
import DropdownMenu from './DropdownMenu';
import DropdownUnauth from './DropdownUnauth';
import DropdownAuthUser from './DropdownAuthUser';
import CartItems from './CartItems';
import { SearchForm } from './SearchForm';
import { useSession } from 'next-auth/react';
import { LeafIconNavBar, UserIconNavBar, CartIconNavBar, MenuIconNavBar, CloseIcon, SearchIconNavBar, ChevronDownNavBar } from '../../../public/svgIcons';

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

    function handleOnMouseLeave() {
        setActive('');
        setShowingMenu('');
    }

    return (
        <>
        <nav className={`${styles.navbar} ${styles.large_screen_navbar}`}>
            <div className={styles.logo_container}>
                <Link href="/" className={styles.logo}>
                    <LeafIconNavBar width={40} height={40} weight={2} />
                </Link>
            </div>
            <ul className={styles.navbar_options}>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary}`} 
                    onClick={() => handleToggle('products')} 
                    onMouseLeave={handleOnMouseLeave}
                >
                    <div className={styles.menu_button}>
                        <span>Products</span>
                        <div id={styles.arrow_down}>
                            <ChevronDownNavBar width={16} height={16} weight={3} />
                        </div>
                    </div>
                    {showingMenu === 'products' && (
                        <div>
                            <DropdownMenu linkActive={active} />
                        </div>
                    )}
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary}`} 
                    onClick={() => handleToggle('services')} 
                    onMouseLeave={handleOnMouseLeave}
                >
                    <div className={styles.menu_button}>
                        <span>Flowell</span>
                        <div id={styles.arrow_down}>
                            <ChevronDownNavBar width={16} height={16} weight={3} />
                        </div>
                    </div>
                    {showingMenu === 'services' && (
                        <div>
                            <DropdownMenu linkActive={active} />
                        </div>
                    )}
                </li>
            </ul>
            <div className={styles.searchBar_container} onClick={() => {
                setActive('')
                setShowingMenu('')}}
            >
                <SearchForm/> 
            </div>                       
            <ul className={styles.navbar_options}>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary}`} 
                    onClick={() => handleToggle('sign_in')} 
                    onMouseLeave={handleOnMouseLeave}
                >
                    <div className={styles.menu_button}>
                        <div className={styles.auth_button}>
                            <UserIconNavBar width={22} height={22} weight={2} />
                            <span>Account</span>
                        </div>
                        <div id={styles.arrow_down} >
                            <ChevronDownNavBar width={16} height={16} weight={3} />
                        </div>
                    </div>
                    {showingMenu === 'sign_in' && (
                        <div>
                            {session?.user?.email ? <DropdownAuthUser linkActive={active} /> : <DropdownUnauth linkActive={active} />}
                        </div>
                    )}
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary}`} 
                    onClick={() => handleToggle('cart')} 
                    onMouseLeave={handleOnMouseLeave}
                >
                    <div className={styles.menu_button}> 
                        <div className={styles.auth_button}>
                            {showingMenu === 'cart' ? <CloseIcon width={22} height={22} weight={2} /> : <CartItems/>}  
                        </div>
                    </div>
                    {showingMenu === 'cart' && (
                        <div>
                            {session?.user?.email ? 
                                <DropdownAuthUser linkActive={active}/> : <DropdownUnauth linkActive={active} />}
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
                <li className={`${styles.menu_button_li} ${styles.menu_button_secondary}`} onClick={() => handleToggle('menu')}>
                    <div className={styles.menu_button}>
                        {showingMenu === 'menu' ? <CloseIcon width={22} height={22} weight={2} /> : <MenuIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'menu' && (
                        <div>
                            <DropdownMenu linkActive={active} />
                        </div>
                    )}
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_secondary}`} onClick={() => handleToggle('sign_in')}>
                    <div className={styles.menu_button}>
                        {showingMenu === 'sign_in' ? <CloseIcon width={22} height={22} weight={2} /> : <UserIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'sign_in' && (
                        <div>
                            {session?.user?.email ? <DropdownAuthUser linkActive={active} /> : <DropdownUnauth linkActive={active} />}
                        </div>
                    )}
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_secondary}`} onClick={() => handleToggle('cart')}>
                    <div className={styles.menu_button}>
                        {showingMenu === 'cart' ? <CloseIcon width={22} height={22} weight={2} /> : <CartIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'cart' && (
                        <div>
                            {session?.user?.email ? <DropdownAuthUser linkActive={active} /> : <DropdownUnauth linkActive={active} />}
                        </div>
                    )}
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_secondary}`}>
                    <div className={styles.menu_button} onClick={() => handleToggle('search')}>
                        {showingMenu === 'search' ? <CloseIcon width={22} height={22} weight={2} /> : <SearchIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'search' && (
                        <div className={styles.dropdown_menu}>
                            <SearchForm />
                        </div>                        
                    )}
                </li>
            </ul>  
        </nav>
        </>
    );
};

export default Navigation;