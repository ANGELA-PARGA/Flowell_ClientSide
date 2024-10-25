'use client'

import styles from './components.module.css'
import Image from 'next/image';
import {useState} from 'react'

const ProductImages = ({images}) => {
    // State to track the currently selected image (main image)
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
                sizes="100vw"
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
                        onClick={() => handleImageClick(url)} // Set the clicked image as the main image
                        style={{ cursor: 'pointer' }} // Make it clear that these are clickable
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