import styles from './components.module.css'
import Image from 'next/image';
import image1 from '../../../public/banner_care_flowers.png'
import Link from 'next/link';

export default function BannerInformative() {
    return (
        <div className={styles.banner_flower_care}>
            <Link href={'/floral-care'}>
                <Image src={image1}
                    sizes="100vw"
                    className={styles.banner_flower_care_image}
                    style={{
                        width: '100%',
                        height: '200px',
                        borderRadius: '0.5rem',  
                    }}                                
                    alt="Picture of a bouquet of white and red roses and a link to learn more">
                </Image>
            </Link>
        </div>
    );
}
