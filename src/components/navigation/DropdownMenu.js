
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
import { LeafIcon, PlantIcon, ShoppingBagIcon, CategoryIcon } from '../../../public/svgIcons';

const categoryData = [
    { src: mini_image1, href: '/products/categories/1', alt: 'bouquet of red roses', name: 'Roses' },
    { src: mini_image2, href: '/products/categories/2', alt: 'bouquet of pink spray roses', name: 'Spray Roses' },
    { src: mini_image3, href: '/products/categories/3', alt: 'bouquet of red gypsophila greenery', name: 'Greenery' },
    { src: mini_image4, href: '/products/categories/4', alt: 'bouquet of green pompons', name: 'Pompons' },
    { src: mini_image5, href: '/products/categories/5', alt: 'bouquet of yellow moms', name: 'Moms' },
    { src: mini_image6, href: '/products/categories/6', alt: 'bouquet of sunflowers', name: 'Sunflowers' },
    { src: mini_image7, href: '/products/categories/7', alt: 'bouquet of orange tulips', name: 'Tulips' },
    { src: mini_image8, href: '/products/categories/8', alt: 'bouquet of purple alstroemerias', name: 'Alstroemerias' },
    { src: mini_image9, href: '/products/categories/9', alt: 'bouquet of white gerberas', name: 'Gerberas' },
    { src: mini_image10, href: '/products/categories/10', alt: 'bouquet of blue hydrangeas', name: 'Hydrangeas' },
    { src: mini_image11, href: '/products', alt: 'bouquet of multiple kinds of flowers', name: 'All products' }
];


const DropdownMenu = ({linkActive, handleClose}) => {

    if (linkActive === 'products') {
        return (
            <div className={styles.dropdown_menu}>
                <h3>Categories</h3>
                <ul className={styles.dropdown_menu_category_list}>
                    {categoryData.map((category, index) => (
                        <li key={index}>
                            <Link href={category.href} onClick={()=> handleClose()} className={styles.dropdown_menu_category_box}>
                                <Image
                                    src={category.src}
                                    width={60}
                                    height={60}
                                    style={{ borderRadius: '50%' }}
                                    alt={category.alt}
                                />
                                {category.name}
                            </Link>
                        </li>
                    ))}
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
                        <LeafIcon width={40} height={40} weight={2}/>
                        <Link href='/about-us' onClick={()=> handleClose()}>About us</Link>
                    </li>
                    <li className={styles.dropdown_menu_flowell_list}>
                        <ShoppingBagIcon width={40} height={40} weight={2} />
                        <Link href='/how-to' onClick={()=> handleClose()}>How to Buy</Link>
                    </li>
                    <li className={styles.dropdown_menu_flowell_list}>
                        <PlantIcon width={40} height={40} weight={2}/>
                        <Link href='/floral-care' onClick={()=> handleClose()}>Handling flowers</Link>
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
                        <CategoryIcon width={20} height={20} weight={2}/>
                        <p>Categories</p>
                    </li>
                    <ul>
                        {categoryData.map((category, index) => (
                            <li key={index} className={styles.dropdown_menu_phone_version_options}>
                                <Link href={category.href} onClick={()=> handleClose()}>
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <li className={styles.dropdown_menu_phone_version_options}>
                        <ShoppingBagIcon width={20} height={20} weight={2} />       
                        <Link href='/how-to' onClick={()=> handleClose()}>How to buy</Link>
                    </li>
                    <li className={styles.dropdown_menu_phone_version_options}>
                        <PlantIcon width={20} height={20} weight={2}/>
                        <Link href='/floral-care' onClick={()=> handleClose()}>Handling your flowers</Link>
                    </li>
                    <li className={styles.dropdown_menu_phone_version_options}>
                        <LeafIcon width={20} height={20} weight={2}/>
                        <Link href='/about-us' onClick={()=> handleClose()}>About us</Link>
                    </li>                    
                </ul>
            </div>
        );
    }

};

export default DropdownMenu;