'use client'

import { useState, useRef, useEffect} from 'react';
import Link from 'next/link';
import styles from './components.module.css';
import DropdownMenu from './DropdownMenu';
import DropdownUnauth from './DropdownUnauth';
import DropdownAuthUser from './DropdownAuthUser';
import CartItems from './CartItems';
import { SearchForm } from './SearchForm';
import { useSession } from 'next-auth/react';
import { LeafIconNavBar, UserIconNavBar, CloseIcon } from '../../../public/svgIcons';
import NavigationPhone from './NavigationPhone';
import { Suspense } from 'react';

const Navigation = () => {
    const [active, setActive] = useState('');
    const [showingMenu, setShowingMenu] = useState('');
    const { data: session } = useSession();
    const menuRef = useRef(null);    

    function handleClickToggle(linkName) {
        if (showingMenu) {
            setActive('');
            setShowingMenu('');
        } else {
            setActive(linkName);
            setShowingMenu(linkName);
        }
    }

    function handleClose() {
        setActive('');
        setShowingMenu('');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActive('');
                setShowingMenu('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);       

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <>
        <nav className={`${styles.navbar} ${styles.large_screen_navbar}`}>
            <div className={styles.logo_container}>
                <Link href="/" className={styles.logo}>
                    <LeafIconNavBar width={40} height={40} weight={2} />
                </Link>
            </div>
            <ul className={styles.navbar_options}>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary}`}>
                    <div className={styles.menu_button} onClick={() => handleClickToggle('products')} >
                        <span>Products</span>
                    </div>
                    {showingMenu === 'products' && (
                    <div ref={menuRef}>
                        <DropdownMenu linkActive={active} handleClose={handleClose}/>
                    </div>
                    )}
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary}`}>
                    <div className={styles.menu_button} onClick={() => handleClickToggle('services')}>
                        <span>Flowell</span>
                    </div>
                    {showingMenu === 'services' && (
                    <div ref={menuRef}>
                        <DropdownMenu linkActive={active} handleClose={handleClose} />
                    </div>
                    )}
                </li>
            </ul>
            <div className={styles.searchBar_container} onClick={() => {
                setActive('')
                setShowingMenu('')}}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchForm />  
                </Suspense> 
            </div>                       
            <ul className={styles.navbar_options}>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary}`}>
                    <div className={styles.menu_button} onClick={() => handleClickToggle('sign_in')}>
                        <div className={styles.auth_button_account}>
                            <UserIconNavBar width={22} height={22} weight={2} />
                            <span>Account</span>
                        </div>
                    </div>
                    {showingMenu === 'sign_in' && (
                        <div ref={menuRef}>
                            {session?.user?.email ? <DropdownAuthUser linkActive={active} handleClose={handleClose}/> : <DropdownUnauth linkActive={active} handleClose={handleClose}/>}
                        </div>
                    )}
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary} ${styles.cart_button_container}`}>
                    <div className={styles.menu_button} onClick={() => handleClickToggle('cart')}> 
                        <div className={styles.auth_button_cart}>
                            {showingMenu === 'cart' ? <CloseIcon width={28} height={28} weight={2} /> : <CartItems/>}  
                        </div>
                    </div>
                    {showingMenu === 'cart' && (
                        <div ref={menuRef}>
                            {session?.user?.email ? 
                                <DropdownAuthUser linkActive={active} handleClose={handleClose}/> : <DropdownUnauth linkActive={active} handleClose={handleClose}/>}
                        </div>
                    )}
                </li>                
            </ul>
        </nav>        
        <NavigationPhone/>        
        </>
    );
};

export default Navigation;