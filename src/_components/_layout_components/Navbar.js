'use client'
import styles from './components.module.css';
import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import DropdownAuth from './DropdownAuth';
import DropdownAuthUser from './DropdownAuthUser';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


const Navigation = () => {
    const [active, setActive] = useState('')
    const [showingMenu, setShowingMenu] = useState(false)
    const { data:session } = useSession()
    
    function handleOnMouseEnter(linkName){
        setActive(linkName)
        setShowingMenu(true)   
    }

    function handleOnMouseLeave(){
        setActive('')
        setShowingMenu(false)
    }

    
    return (
        <>
        <nav className={styles.navbar}>
            <div className={styles.logo_container}>
                <Link href={'/'}  className={styles.logo}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-leaf" width="50" height="50" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                    <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" />
                    </svg>
                </Link>
            </div>
            <ul className={styles.navbar_options}>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary}`} onMouseLeave={() => handleOnMouseLeave('products')}>                    
                    <div className={styles.menu_button} onMouseEnter={() => handleOnMouseEnter('products')}>
                        <span>Products</span>
                        <div id={styles.arrow_down}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="16" height="16" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 9l6 6l6 -6" />
                            </svg> 
                        </div> 
                    </div>
                    { showingMenu &&  active === 'products' ?
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownMenu linkActive={active} />
                        </div> : <></>
                    }                      
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary}`} onMouseLeave={() => handleOnMouseLeave('services')}>                    
                    <div className={styles.menu_button} onMouseEnter={() => handleOnMouseEnter('services')}>
                        <span>Flowell</span>
                        <div id={styles.arrow_down}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="16" height="16" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 9l6 6l6 -6" />
                            </svg> 
                        </div> 
                    </div>
                    { showingMenu &&  active === 'services' ?
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownMenu linkActive={active} />
                        </div> : <></>
                    }                                         
                </li>
                <li className={`${styles.menu_button_secondary} ${styles.menu_button_li} `} onMouseLeave={() => handleOnMouseLeave('menu')}>                    
                    <div className={styles.menu_button} onMouseEnter={() => handleOnMouseEnter('menu')}>
                        <span>Menu</span>
                        <div id={styles.arrow_down}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="16" height="16" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 9l6 6l6 -6" />
                            </svg> 
                        </div> 
                    </div>
                    { showingMenu &&  active === 'menu' ?
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownMenu linkActive={active} />
                        </div> : <></>
                    }                                         
                </li>
            </ul>
            <form action="." className={styles.search_container}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                    </svg>
                </div>
                <input type="text" placeholder='Search' />
            </form>            
            <ul className={styles.navbar_options}>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary}`} onMouseLeave={() => handleOnMouseLeave('sign_in')}>
                    <div className={styles.menu_button} onMouseEnter={() => handleOnMouseEnter('sign_in')}>                
                        <div className={styles.auth_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                            {!session?.user?.email ? <span>Sign In</span> : <></>}
                            {session?.user?.email ? <span>Account</span> : <></>}
                        </div>
                        <div id={styles.arrow_down}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="16" height="16" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 9l6 6l6 -6" />
                            </svg> 
                        </div> 
                    </div> 
                    { showingMenu &&  active === 'sign_in' && !session?.user?.email ?
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownAuth linkActive={active} />
                        </div> : <></>
                    }
                    { showingMenu &&  active === 'sign_in' && session?.user?.email ?
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownAuthUser linkActive={active} />
                        </div> : <></>
                    }                    
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_primary}`} onMouseLeave={() => handleOnMouseLeave('cart')}>
                    <div className={styles.menu_button} onMouseEnter={() => handleOnMouseEnter('cart')}>
                        <div className={styles.auth_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                            <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                            <path d="M17 17h-11v-14h-2" />
                            <path d="M6 5l14 1l-1 7h-13" />
                            </svg>
                            <span>Cart</span>
                        </div>
                        <div id={styles.arrow_down}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="16" height="16" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 9l6 6l6 -6" />
                            </svg> 
                        </div>                                     
                    </div>
                    { showingMenu &&  active === 'cart' && !session?.user?.email ?
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownAuth linkActive={active}/>
                        </div> : <></>
                    } 
                    { showingMenu &&  active === 'cart' && session?.user?.email ?
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownAuthUser linkActive={active}/>
                        </div> : <></>
                    }
                </li>
                <li className={`${styles.menu_button_li} ${styles.menu_button_secondary}`} onMouseLeave={() => handleOnMouseLeave('auth')} >
                    <div className={styles.menu_button} onMouseEnter={() => handleOnMouseEnter('auth')}>
                        <div className={styles.auth_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 6l16 0" />
                            <path d="M4 12l16 0" />
                            <path d="M4 18l16 0" />
                            </svg>
                        </div>
                        <div id={styles.arrow_down}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="16" height="16" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6 9l6 6l6 -6" />
                            </svg> 
                        </div>                
                    </div>
                    { showingMenu &&  active === 'auth' && !session?.user?.email ?
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownAuth linkActive={active} />
                        </div> : <></>
                    }
                    { showingMenu &&  active === 'auth' && session?.user?.email ?
                        <div className={styles.dropdown_menu_display_show}>
                            <DropdownAuthUser linkActive={active} />
                        </div> : <></>
                    }
                </li>
            </ul>           
        </nav>     
        </>
    );
};

export default Navigation;
