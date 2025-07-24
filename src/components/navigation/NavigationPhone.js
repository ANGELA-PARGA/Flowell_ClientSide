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
    const menuButtonsRef = useRef([]);
    

    function handleClickToggle(linkName, event) {
        if (event) event.stopPropagation();
        console.log('Clicked:', linkName);
        if (showingMenu === linkName) {
            console.log('Closing menu:', linkName);
            setActive('');
            setShowingMenu('');
        } else {
            console.log('Opening menu:', linkName);
            setActive(linkName);
            setShowingMenu(linkName);
        }
    }

    function handleClose(){
        console.log('Closing all menus');
        setActive('');
        setShowingMenu('');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isMenuButton = menuButtonsRef.current.some(button => 
                button && button.contains(event.target)
            );
            
            if (!isMenuButton && menuRef.current && !menuRef.current.contains(event.target)) {
                console.log('Clicked outside (not on menu button), closing menus');
                setActive('');
                setShowingMenu('');
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, menuButtonsRef]);

    return (
        <>
        <nav className={`${styles.navbar} ${styles.small_screen_navbar}`}>
            <div className={styles.logo_container}>
                <Link href="/" className={styles.logo} aria-label="Go to main page">
                    <LeafIconNavBar width={40} height={40} weight={2} />
                </Link>
            </div>
            <ul className={styles.navbar_options}>
                <li className={`${styles.nav_item} ${styles.nav_item_mobile}`}>
                    <div className={styles.menu_button} onClick={(e) => handleClickToggle('menu', e)} ref={el => menuButtonsRef.current[0] = el}>
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
                <li className={`${styles.nav_item} ${styles.nav_item_mobile}`}>
                    <div className={styles.menu_button} onClick={() => handleClickToggle('sign_in')} ref={el => menuButtonsRef.current[1] = el}>
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
                <li className={`${styles.nav_item} ${styles.nav_item_mobile}`}>
                    <div className={styles.menu_button} onClick={() => handleClickToggle('cart')} ref={el => menuButtonsRef.current[2] = el}>
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
                <li className={`${styles.nav_item} ${styles.nav_item_mobile}`}>
                    <div className={styles.menu_button} onClick={() => handleClickToggle('search')} ref={el => menuButtonsRef.current[3] = el}>
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