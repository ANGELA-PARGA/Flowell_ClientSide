'use client'

import { useState, useRef, useEffect} from 'react';
import Link from 'next/link';
import styles from './components.module.css';
import DropdownMenu from './DropdownMenu';
import DropdownUnauth from './DropdownUnauth';
import DropdownAuthUser from './DropdownAuthUser';
import { SearchForm } from './SearchForm';
import { useSession } from 'next-auth/react';
import { Suspense } from 'react';
import { LeafIconNavBar, UserIconNavBar, CartIconNavBar, MenuIconNavBar, CloseIcon, SearchIconNavBar } from '../../../public/svgIcons';

const NavigationPhone = () => {
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

    function handleClose(){
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
        <nav className={`${styles.navbar} ${styles.small_screen_navbar}`}>
            <div className={styles.logo_container}>
                <Link href="/" className={styles.logo} aria-label="Go to main page">
                    <LeafIconNavBar width={40} height={40} weight={2} />
                </Link>
            </div>
            <ul className={styles.navbar_options}>
                <li className={`${styles.menu_button_li} ${styles.menu_button_secondary}`}>
                    <div className={styles.menu_button} onClick={() => handleClickToggle('menu')}>
                    {showingMenu === 'menu' ? <CloseIcon width={22} height={22} weight={2} /> : <MenuIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'menu' && (
                        <div className={`${styles.overlay} ${showingMenu === 'menu' ? styles.active : ''}`}>
                            <div ref={menuRef} >
                                <DropdownMenu linkActive={active} handleClose={handleClose}/>
                            </div>
                        </div>
                    )}                                        
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_secondary}`}>
                    <div className={styles.menu_button} onClick={() => handleClickToggle('sign_in')}>
                        {showingMenu === 'sign_in' ? <CloseIcon width={22} height={22} weight={2} /> : <UserIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'sign_in' && (
                        <div className={`${styles.overlay} ${showingMenu === 'sign_in' ? styles.active : ''}`}>
                            <div ref={menuRef}>
                                {session?.user?.email ? <DropdownAuthUser linkActive={active} handleClose={handleClose}/> : <DropdownUnauth linkActive={active} handleClose={handleClose}/>}
                            </div>
                        </div>
                    )}
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_secondary}`}>
                    <div className={styles.menu_button} onClick={() => handleClickToggle('cart')}>
                        {showingMenu === 'cart' ? <CloseIcon width={22} height={22} weight={2} /> : <CartIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'cart' && (
                        <div className={`${styles.overlay} ${showingMenu === 'cart' ? styles.active : ''}`}>
                            <div ref={menuRef}>
                                {session?.user?.email ? <DropdownAuthUser linkActive={active} handleClose={handleClose}/> : <DropdownUnauth linkActive={active} handleClose={handleClose}/>}
                            </div>
                        </div>
                    )}
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_secondary}`}>
                    <div className={styles.menu_button} onClick={() => handleClickToggle('search')}>
                        {showingMenu === 'search' ? <CloseIcon width={22} height={22} weight={2} /> : <SearchIconNavBar width={22} height={22} weight={2} />}
                    </div>
                    {showingMenu === 'search' && (
                        <div className={styles.search_dropdown_menu} ref={menuRef} >
                            <Suspense fallback={<div></div>}>
                                <SearchForm handleClose={handleClose}/>
                            </Suspense>
                        </div>                        
                    )}
                </li>
            </ul>  
        </nav>
        </>
        
    );
};

export default NavigationPhone;