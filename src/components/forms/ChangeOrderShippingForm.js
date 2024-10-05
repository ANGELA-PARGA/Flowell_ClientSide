'use client'

import { updateOrderShippingInfo } from '@/actions/ordersRequest';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import styles from './components.module.css';

const schema = yup.object().shape({
    contact_info_id: yup.number().required('Please select a phone number'),
    shipping_address_id: yup.number().required('Please select a shipping address'),    
});

const ChangeOrderShippingForm = ({data}) => {
    const [updateError, setupdateError] = useState(); 
    const router = useRouter();
    const searchParams = useSearchParams();

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData, e) => {
        console.log('Form Data:', { ...formData});

        e.preventDefault()
        const shipping_info = {
            ...formData,
        }
        await schema.validate(shipping_info)

        try {
            await updateOrderShippingInfo(shipping_info, data.id)
            toast.success(`Shipping information updated succesfully`) 
            const currentParams = new URLSearchParams(searchParams.toString());
            currentParams.delete('edit');
            router.replace(`?${currentParams.toString()}`, undefined, { shallow: true }); // Shallow navigation 
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to update the order shipping information, try again')  
        }        
    }
    

    return (
        <form className={styles.checkoutForm} onSubmit={handleSubmit(onSubmit)}>
            <p>If you need to change the address because a mistypo, go to 'My addresses' and select 'Edit address'</p>
            <p>If you need to change the phone number because a mistypo, go to 'My phones' and select 'Edit phone'</p>
            <div className={styles.checkoutInfo}>
                <div className={styles.checkoutBoxes}>
                    <h4>Select Contact Phone Number</h4>
                    {data.user.phones?.map((phone, index) => (
                        <div key={index} className={styles.radioInput}>
                            <input
                                type="radio"
                                value={Number(phone.phoneID)}
                                {...register('contact_info_id')}
                                defaultChecked={Number(phone.phoneID) === data.contact_info_id}
                            />
                            <label>{phone.phone}</label>
                        </div>
                    ))}
                    {errors.contact_info_id && <p className={styles.error_updating_info}>{errors.contact_info_id.message}</p>}
                </div>
                <div className={styles.checkoutBoxes}>
                    <h4>Select Shipping Address</h4>
                    {data.user.addresses?.map((address, index) => (
                    <div key={index} className={styles.radioInput}>
                        <input
                            type="radio"
                            value={Number(address.addressID)}
                            {...register('shipping_address_id')}
                            defaultChecked={Number(address.addressID) === data.shipping_address_id}
                        />
                        <label>{address.address}, {address.city} - {address.state}, {address.zip_code}</label>        
                    </div>
                    ))}
                    {errors.shipping_address_id && <p className={styles.error_updating_info}>{errors.shipping_address_id.message}</p>}
                </div>
            </div>            
            <button type='submit' disabled={isSubmitting} className={styles.pay_button}>Update</button>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </form>
    )
}

export default ChangeOrderShippingForm