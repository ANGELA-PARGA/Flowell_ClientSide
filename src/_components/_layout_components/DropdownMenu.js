'use client'

import Link from 'next/link';
import styles from './components.module.css'
import Image from 'next/image';
import mini_image1 from '../../../public/mini_image1.jpeg'
import mini_image2 from '../../../public/mini_image2.jpeg'
import mini_image3 from '../../../public/mini_image3.jpeg'
import mini_image4 from '../../../public/mini_image4.jpeg'
import mini_image5 from '../../../public/mini_image5.jpeg'
import mini_image6 from '../../../public/mini_image6.jpeg'
import mini_image7 from '../../../public/mini_image7.jpeg'
import mini_image8 from '../../../public/mini_image8.jpeg'
import mini_image9 from '../../../public/mini_image9.jpeg'
import mini_image10 from '../../../public/mini_image10.jpeg'
import mini_image11 from '../../../public/mini_image11.jpeg'

const DropdownMenu = ({linkActive}) => {

    if(linkActive === 'products'){
        return (
            <div className={styles.dropdown_menu}>
                <h3>Categories</h3>
                <ul className={styles.dropdown_menu_category_list}>
                    <li>
                        <div className={styles.dropdown_menu_category_box}>
                            <Image 
                                src={mini_image1}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: '50%'
                                }}
                                alt='bouquet of red roses'
                            ></Image>
                            <Link href='/products/categories/1'>Roses</Link>
                        </div>
                    </li>
                    <li>
                        <div className={styles.dropdown_menu_category_box}>
                            <Image 
                                src={mini_image2}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: '50%'
                                }}
                                alt='bouquet of pink spray roses'
                            ></Image>
                            <Link href='/products/categories/2'>Spray Roses</Link>
                        </div>
                    </li>
                    <li>
                        <div className={styles.dropdown_menu_category_box}>
                            <Image 
                                src={mini_image3}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: '50%'
                                }}
                                alt='bouquet of red gypsophila greenery'
                            ></Image>
                            <Link href='/products/categories/3'>Greenery</Link>
                        </div>
                    </li>
                    <li>
                        <div className={styles.dropdown_menu_category_box}>
                            <Image 
                                src={mini_image4}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: '50%'
                                }}
                                alt='bouquet of green pompons'
                            ></Image>
                            <Link href='/products/categories/4'>Pompons</Link>
                        </div>
                    </li>
                    <li>
                        <div className={styles.dropdown_menu_category_box}>
                            <Image 
                                src={mini_image5}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: '50%'
                                }}
                                alt='bouquet of yellow moms'
                            ></Image>
                            <Link href='/products/categories/5'>Moms</Link>
                        </div>
                    </li>
                    <li>
                        <div className={styles.dropdown_menu_category_box}>
                            <Image 
                                src={mini_image6}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: '50%'
                                }}
                                alt='bouquet of sunflowers'
                            ></Image>
                            <Link href='/products/categories/6'>Sunflowers</Link>
                        </div>
                    </li>
                    <li>
                        <div className={styles.dropdown_menu_category_box}>
                            <Image 
                                src={mini_image7}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: '50%'
                                }}
                                alt='bouquet of orange tulips'
                            ></Image>
                            <Link href='/products/categories/7'>Tulips</Link>
                        </div>
                    </li>
                    <li>
                        <div className={styles.dropdown_menu_category_box}>
                            <Image 
                                src={mini_image8}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: '50%'
                                }}
                                alt='bouquet of purple alstroemerias'
                            ></Image>
                            <Link href='/products/categories/8'>Alstroemerias</Link>
                        </div>                        
                    </li>
                    <li>
                        <div className={styles.dropdown_menu_category_box}>
                            <Image 
                                src={mini_image9}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: '50%'
                                }}
                                alt='bouquet of white gerberas'
                            ></Image>
                            <Link href='/products/categories/9'>Gerberas</Link>
                        </div>                        
                    </li>
                    <li>
                        <div className={styles.dropdown_menu_category_box}>
                            <Image 
                                src={mini_image10}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: '50%'
                                }}
                                alt='bouquet of blue hydrangeas'
                            ></Image>
                            <Link href='/products/categories/10'>Hydrangeas</Link>
                        </div>                        
                    </li>
                    <li>
                        <div className={styles.dropdown_menu_category_box}>
                            <Image 
                                src={mini_image11}
                                width={60}
                                height={60}
                                style={{
                                    borderRadius: '50%'
                                }}
                                alt='bouquet of multiple kinds of flowers'
                            ></Image>
                            <Link href='/products'>See all products</Link>
                        </div>                        
                    </li>
                </ul>
            </div>
        );
    }

    if(linkActive === 'services'){
        return (
            <div className={styles.dropdown_menu}>
                <h3>Flowell Services</h3>
                <ul className={styles.dropdown_menu_category_list}>
                    <li className={styles.dropdown_menu_flowell_list}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-leaf" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                            <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" />
                            </svg>
                        </div>
                        <Link href='/about-us'>About us</Link>
                    </li>
                    <li className={styles.dropdown_menu_flowell_list}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-bag" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                            <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                            </svg>
                        </div>
                        <Link href='/how-to'>How to Buy</Link>
                    </li>
                    <li className={styles.dropdown_menu_flowell_list}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-growth" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M16.5 15a4.5 4.5 0 0 0 -4.5 4.5m4.5 -8.5a4.5 4.5 0 0 0 -4.5 4.5m4.5 -8.5a4.5 4.5 0 0 0 -4.5 4.5m-4 3.5c2.21 0 4 2.015 4 4.5m-4 -8.5c2.21 0 4 2.015 4 4.5m-4 -8.5c2.21 0 4 2.015 4 4.5m0 -7.5v6" />
                            </svg>
                        </div>
                        <Link href='/floral-care'>How to care your product</Link>
                    </li>
                </ul>
            </div>
        );
    }

    if(linkActive === 'menu'){
        return (
            <div className={styles.dropdown_menu}>
                <ul className={styles.dropdown_menu_phone_version}>
                    <li className={styles.dropdown_menu_phone_version_options}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-category" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 4h6v6h-6z" />
                            <path d="M14 4h6v6h-6z" />
                            <path d="M4 14h6v6h-6z" />
                            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                            </svg>
                        </div>
                        <Link href='/categories'>Categories</Link>
                    </li>
                    <li className={styles.dropdown_menu_phone_version_options}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-bag" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                            <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                            </svg>
                        </div>
                        <Link href='/how-to'>How to buy</Link>
                    </li>
                    <li className={styles.dropdown_menu_phone_version_options}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-growth" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M16.5 15a4.5 4.5 0 0 0 -4.5 4.5m4.5 -8.5a4.5 4.5 0 0 0 -4.5 4.5m4.5 -8.5a4.5 4.5 0 0 0 -4.5 4.5m-4 3.5c2.21 0 4 2.015 4 4.5m-4 -8.5c2.21 0 4 2.015 4 4.5m-4 -8.5c2.21 0 4 2.015 4 4.5m0 -7.5v6" />
                            </svg>
                        </div>
                        <Link href='/floral-care'>How to care your product</Link>
                    </li>
                    <li className={styles.dropdown_menu_phone_version_options}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-leaf" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                            <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" />
                            </svg>
                        </div>
                        <Link href='/about-us'>About us</Link>
                    </li>                    
                </ul>
            </div>
        );
    }

};

export default DropdownMenu;