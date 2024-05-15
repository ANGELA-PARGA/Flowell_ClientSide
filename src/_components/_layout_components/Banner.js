"use client"

import styles from './components.module.css'
import Image from 'next/image';
import image1 from '../../../public/banner_complete1.png'
import image2 from '../../../public/banner_complete2.png'
import image3 from '../../../public/banner_complete3.png'
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback } from 'react';

export default function Banner() {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop:true}, [Autoplay({delay:5000,  speed:1})])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])
    
    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])
    
    return (
        <div className={styles.banner_container}>
            <div className={styles.embla_button} onClick={scrollPrev}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="34" height="34" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15 6l-6 6l6 6" />
                    </svg>
            </div>
            <div className={styles.embla}>
                <div className={styles.embla_viewport} ref={emblaRef}>
                    <div className={styles.embla_container}>
                        <div className={styles.embla_slide}>
                            <div className={styles.embla_slide_img_container}>
                                <Link href={'/categories/1'}>
                                    <Image  src={image1}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '0.5rem'
                                        }} 
                                        priority                               
                                        alt="Picture of a floral shop with multiple kinds of flowers"/>
                                </Link>
                                </div>
                        </div>
                        <div className={styles.embla_slide}>
                            <div className={styles.embla_slide_img_container}>
                                <Link href={'/categories/1'}>
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
                                <Link href={'/categories/1'}>
                                    <Image  src={image3}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '0.5rem'
                                        }} 
                                        priority                               
                                        alt="Picture of a rose crop inside a greenhouse"/>
                                </Link>
                            </div>
                        </div>
                    
                        <div className={styles.embla_slide}>
                            <div className={styles.banner_text_image}>
                                <div className={styles.banner_logo}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-leaf" width="150" height="150" viewBox="0 0 24 24" strokeWidth="2" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                                    <path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z" />
                                    </svg>
                                    <h2>Flowell</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>         
            </div>
            <div className={styles.embla_button} onClick={scrollNext}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="34" height="34" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 6l6 6l-6 6" />
                </svg>
            </div>
        </div>
    );
}
