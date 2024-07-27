import Link from "next/link"
import styles from './components.module.css'
import { InstagramIcon, TiktokIcon, XIcon, LeafIcon } from "../../../public/svgIcons";

const categoryData = [
    { href: '/products', name: 'All products' },
    { href: '/products/categories/1', name: 'Roses' },
    { href: '/products/categories/2', name: 'Spray Roses' },
    { href: '/products/categories/3', name: 'Greenery' },
    { href: '/products/categories/4', name: 'Pompons' },
    { href: '/products/categories/5', name: 'Moms' },
    { href: '/products/categories/6', name: 'Sunflowers' },
    { href: '/products/categories/7', name: 'Tulips' },
    { href: '/products/categories/8', name: 'Alstroemerias' },
    { href: '/products/categories/9', name: 'Gerberas' },
    { href: '/products/categories/10', name: 'Hydrangeas' }
];

const Footer = () => {
    return (
        <section className={styles.footer_main_container}>
            <div className={styles.footer_products}>
                <h3>Products</h3>
                <ul>
                    {categoryData.map((category, index) => (
                        <li key={index}>
                            <Link href={category.href} className={styles}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.footer_contact}>
                <h3>Contact</h3>
                <ul >
                    <li>Phone: <span>1-855-000-0707</span></li>
                    <li>Email: <span>customerservice@flowell.com.us</span></li>
                </ul>
                <div className={styles.social_icons}>
                        <Link href={'https://www.instagram.com/'}><InstagramIcon width={32} height={32} weight={1.5}/></Link> 
                        <Link href={'https://www.tiktok.com/'}><TiktokIcon width={32} height={32} weight={1.5}/></Link>
                        <Link href={'https://x.com/X'}><XIcon width={32} height={32} weight={1.5}/></Link>
                </div>                
                <div  className={styles.logo_icon}>
                    <LeafIcon width={48} height={48} weight={1.5}/> 
                    <p>Flowell</p>
                </div>
                
            </div>
            <div className={styles.footer_resources}>
                <h3>Resources</h3>
                <ul className={styles}>
                    <li className={styles}>
                        <Link href='/about-us'>About us</Link>
                    </li>
                    <li className={styles}>
                        <Link href='/how-to'>How to Buy</Link>
                    </li>
                    <li className={styles}>
                        <Link href='/floral-care'>Handling flowers</Link>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Footer