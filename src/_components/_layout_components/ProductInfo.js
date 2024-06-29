'use client'

import styles from './components.module.css'
import Image from 'next/image';
import mini_image1 from '../../../public/mini_image1.jpeg'
import { TrashIcon } from '../../../public/svgIcons';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { addProductToCart } from '@/actions/productRequests';
import { updateCartItem, deleteCartItem } from '@/actions/cartRequests';
import { StoreContext } from '@/context';

const ProductInfo = ({data, id}) => {
    const [updateError, setupdateError] = useState();
    const [itemQty, setItemQty] = useState(false);
    const { data: session } = useSession();
    const { cartData, populateCartData, getProductQtyInCart } = useContext(StoreContext);
    const productId = parseInt(id); 

    useEffect(() => {
        if (session?.user?.email) {
            const savedCartData = localStorage.getItem('cartData');
            const parsedCartData = savedCartData ? JSON.parse(savedCartData) : null;
            if (parsedCartData) {
                setItemQty(getProductQtyInCart(parsedCartData, productId));
            }
        }
    }, [session, productId, cartData]);


    const schema = yup.object().shape({
        qty: yup.number().required("Please select a quantity")
    });
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = async (data, e) => {
        e.preventDefault()
        await schema.validate(data)
        const productToAdd = {
            ...data,
            product_id:productId,
        }
        try {
            await addProductToCart(productToAdd);
            await populateCartData();
            toast.success(`Added ${productToAdd.qty} cases to the cart`)
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to add to cart')
        }
        
    };

    const handleUpdate = async (data, e) => {
        e.preventDefault()
        const productToUpdate = {
            ...data,
            product_id:productId,
        }
        console.log('handle update:', productToUpdate)
        try {
            await updateCartItem(productToUpdate);
            await populateCartData();
            toast.success(`Updated ${productToUpdate.qty} case(s) to the cart`)
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to update item in cart')
        }
        
    };

    const handleDelete = async (e) => {
        e.preventDefault()
        console.log('handle delete:', productId)        
        try {
            await deleteCartItem(productId);
            await populateCartData();
            toast.success(`Deleted product to the cart`)
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error(`Failed to delete product in cart`)
        }
        
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
                    <p id={styles.price_presentation}>${data.product_found.price_per_case.toFixed(2)}</p>
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
                {session?.user?.email ? 
                    <div className={styles.add_to_cart_container}>
                    {!itemQty ? 
                        <form className={styles.add_to_cart_form} onSubmit={handleSubmit(onSubmit)}>                       
                            <select {...register("qty")}>
                            {[...Array(30)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                            ))}
                            </select>
                            <button className={styles.add_to_cart_button} type="submit" disabled={isSubmitting}>Add to Cart</button>
                            {errors.quantity && <p>{errors.quantity.message}</p>}
                        </form> :
                        <div className={styles.product_cart_buttons_container}>
                            <div className={styles.product_cart_button_minicontainer}>
                                {itemQty > 1 ? <button className={styles.update_cart_items_button} onClick={(e)=> handleUpdate({qty : itemQty-1}, e)}> - </button> : <button className={styles.update_cart_items_button} onClick={(e)=> handleDelete(e)}><TrashIcon width={16} height={16} weight={2}/></button>}
                                <p>{itemQty}</p>
                                <button className={styles.update_cart_items_button} onClick={(e)=> handleUpdate({qty : itemQty+1}, e)}> + </button>
                            </div>
                            <div>
                                {itemQty === 1 ? <></>:<button className={styles.update_cart_items_button} onClick={(e)=> handleDelete(e)}><TrashIcon width={16} height={16} weight={2}/></button>}
                            </div>                                
                        </div>
                    }                    
                    </div> : <button className={styles.add_to_cart_button} type="submit">Log in to buy</button>
                }
                <div>
                    <p className={styles.error_updating_info}>{updateError}</p>
                </div>                    
            </div>
        </div>
    )

};

export default ProductInfo;