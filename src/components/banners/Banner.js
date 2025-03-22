"use client"

import styles from './components.module.css'
import Image from 'next/image';
import image1 from '../../../public/banner_complete1.webp'
import image2 from '../../../public/banner_complete2.webp'
import image3 from '../../../public/banner_complete3.webp'
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useDotButton, DotButton } from './BannerDotButtons';

export default function Banner() {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop:true}, [Autoplay({delay:5000,  speed:1})])
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
    
    return (
        <div className={styles.banner_container}>
            <div className={styles.embla}>
                <div className={styles.embla_viewport} ref={emblaRef}>
                    <div className={styles.embla_container}>
                        <div className={styles.embla_slide}>
                            <div className={styles.embla_slide_img_container}>
                                <Link href={'/products'}>
                                    <Image  src={image1}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: 'auto'
                                        }} 
                                        priority                               
                                        alt="Picture of a floral shop with multiple kinds of flowers"/>
                                </Link>
                                </div>
                        </div>
                        <div className={styles.embla_slide}>
                            <div className={styles.embla_slide_img_container}>
                                <Link href={'/products'}>
                                    <Image  src={image2}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                        }}
                                        alt="Picture of a bouquet of roses in a backyard on a sunset"/>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.embla_slide}>
                            <div className={styles.embla_slide_img_container}>
                                <Link href={'/products'}>
                                    <Image  src={image3}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '0.5rem'
                                        }}                                
                                        alt="Picture of a rose crop inside a greenhouse"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>         
            </div>
            <div className={styles.emblaDots}>
                {scrollSnaps.map((_, index) => (
                    <DotButton
                    key={index}
                    index={index}
                    selectedIndex ={selectedIndex}
                    onClick={() => onDotButtonClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}
