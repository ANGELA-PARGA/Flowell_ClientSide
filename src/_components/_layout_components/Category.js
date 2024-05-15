"use client"

import styles from './components.module.css'
import Image from 'next/image';
import Link from 'next/link';
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
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react';


export default function Category() {
    const data = [
    {
        id: 1, 
        name: 'Roses',
        src: mini_image1
    }, 
    {
        id: 2, 
        name: 'Spray Roses',
        src: mini_image2
    },
    {
        id: 3,
        name: 'Greenery',
        src: mini_image3
    },
    {
        id: 4,
        name: 'Pompons',
        src: mini_image4
    },
    {
        id: 5, 
        name: 'Moms',
        src: mini_image5
    }, 
    {
        id: 6, 
        name: 'Sunflowers',
        src: mini_image6
    },
    {
        id: 7,
        name: 'Tulips',
        src: mini_image7
    },
    {
        id: 8,
        name: 'Alstroemerias',
        src: mini_image8
    },
    {
        id: 9,
        name: 'Gerberas',
        src: mini_image9
    },
    {
        id: 10,
        name: 'Hydrangeas',
        src: mini_image10
    }
]

const [emblaRef, emblaApi] = useEmblaCarousel({loop:true})

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])
    
    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])


return (
    <section className={styles.categories_container}>
        <div className={styles.title_categories_container}>
            <h2>Categories </h2>
            <div className={styles.categories_buttons_container}>
                <div className={styles.embla_button_category} onClick={scrollPrev}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="34" height="34" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15 6l-6 6l6 6" />
                    </svg>
                </div>
                <div className={styles.embla_button_category} onClick={scrollNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="34" height="34" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0067a0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 6l6 6l-6 6" />
                    </svg>
                </div>
            </div>
        </div>
        <div className={styles.banner_container}>
            <div className={styles.embla}>
                <div className={styles.embla_viewport} ref={emblaRef}>
                    <div className={styles.embla_container_categories}>
                        {data.map((item) => (
                            <div key={item.id} className={styles.embla_slide_category}>
                                <div className={styles.embla_slide_img_category_container}>                            
                                    <Image  
                                        src={item.src}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '0.5rem'
                                        }}                                
                                        alt={`Picture of the ${item.name} category`}/>
                                    <Link href={`/products/categories/${item.id}`}><h4>{item.name}</h4></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>         
            </div>
        </div>        
    </section>   
    );
}

