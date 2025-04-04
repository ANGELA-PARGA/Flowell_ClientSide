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
import Autoplay from 'embla-carousel-autoplay'
import { useDotButton, DotButton } from './BannerDotButtons';


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

    const [emblaRef, emblaApi] = useEmblaCarousel({loop:true}, [Autoplay({delay:5000,  speed:1})])
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

return (
    <section className={styles.categories_container}>
        <div className={styles.banner_container}>
            <div className={styles.embla}>
                <div className={styles.embla_viewport} ref={emblaRef}>
                    <div className={styles.embla_container_categories}>
                        {data.map((item) => (
                            <div key={item.id} className={styles.embla_slide_category}>
                                <div className={styles.embla_slide_img_category_container}>                            
                                    <Image  
                                        src={item.src}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: '50%'
                                        }}                                
                                        alt={`Picture of the ${item.name} category`}/>
                                    <Link href={`/products/categories/${item.id}`} prefetch={false}>{item.name}</Link>
                                </div>
                            </div>
                        ))}
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
    </section>   
    );
}

