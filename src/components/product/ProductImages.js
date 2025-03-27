'use client'

import styles from './components.module.css'
import Image from 'next/image';
import {useState} from 'react'

const ProductImages = ({images}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]); // Default to the first image

  // Function to handle mini image click
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Update the main image
  };

  return (
    <div className={styles.all_images_container}>
        <div className={styles.main_image_container}>
            <Image src={selectedImage}
                fill
                sizes="(max-width: 390px) 300px, (max-width: 853px) 350px, (max-width: 1064px) 450px, 450px"
                style={{
                    borderRadius: '5%',
                }}
                priority
                alt={`Product thumbnail`}>
            </Image>
        </div>
        <div className={styles.mini_images_container}>
        {
            images.map((url, index) =>{
                return(
                    <div key={index} 
                        className={styles.images_mini_images_container}
                        onClick={() => handleImageClick(url)} 
                        style={{ cursor: 'pointer' }} 
                    >
                        <Image  src={url}
                                width={100}
                                height={100}
                                style={{
                                    borderRadius: '5%',
                                }}
                                priority
                                alt={`Product thumbnail ${index + 1}`}
                        />
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default ProductImages