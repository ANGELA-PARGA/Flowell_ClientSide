'use client'

import styles from './components.module.css'
import Image from 'next/image';
import mini_image1 from '../../../public/mini_image1.jpeg'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ProductInfo = ({data}) => {

    const schema = yup.object().shape({
        qty: yup.number().required("Please select a quantity")
    });
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = async (data, e) => {
        console.log(data);
        e.preventDefault()
        await schema.validate(data)
        reset()
    };
    

    return (
        <div className={styles.main_info_container}>            
            <div className={styles.mini_images_container}>
                <div>
                    <Image src={mini_image1}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '25%'
                            }}
                            alt='bouquet of purple alstroemerias'>
                    </Image>
                </div>
                <div>
                    <Image src={mini_image1}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '25%'
                            }}
                            alt='bouquet of purple alstroemerias'>
                    </Image>
                </div>
                <div>
                    <Image src={mini_image1}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '25%'
                            }}
                            alt='bouquet of purple alstroemerias'>
                    </Image>
                </div>
            </div>
            <div className={styles.main_image_container}>
                <Image  src={mini_image1}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        priority
                        alt="Picture of the author"
                />
            </div>
            <div className={styles.product_info_container}>
                <div className={styles.product_title_container}>
                    <h1>{data.product_found.name}</h1>
                    <p id={styles.price_presentation}>${data.product_found.price_per_case}</p>
                    <p>{data.product_found.description}</p>
                </div> 
                <div className={styles.product_presentation_container}>
                        <h4>{data.product_found.measure_per_case} count: <span>{data.product_found.qty_per_case}</span></h4>
                        <h4>color variety: <span>{data.product_found.color}</span></h4>
                </div>                                    
                <div className={styles.product_charact_container}>
                    <h3>Characteristics</h3>
                    <p>Remember: color shades variations are present, flowers are product of mother nature</p>
                    <ul>
                        <li><h4>Stem length:</h4> {data.product_found.stem_length_cm} cm</li>
                        <li><h4>Lasting life:</h4> between {data.product_found.life_in_days-3} and {data.product_found.life_in_days} days aproximately</li>
                        <li><h4>Blooms per stem:</h4> {data.product_found.blooms_per_stem}</li>
                        <li><h4>Blooms size:</h4> between {data.product_found.bloom_size_cm-0.5} and {data.product_found.bloom_size_cm+0.5} cm</li>
                    </ul>
                </div>
                <div className={styles.add_to_cart_container}>
                    <form className={styles.add_to_cart_form} onSubmit={handleSubmit(onSubmit)}>
                        <select {...register("qty")}>
                            {[...Array(30)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                            ))}
                        </select>
                        {errors.quantity && <p>{errors.quantity.message}</p>}
                        <button className={styles.add_to_cart_button} type="submit">Add to Cart</button>
                    </form>
                </div>                    
            </div>
        </div>
    )

};

export default ProductInfo;