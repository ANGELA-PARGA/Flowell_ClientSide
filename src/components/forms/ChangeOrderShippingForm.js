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
    contact_phone: yup.string().required('The phone is required and must be valid')
        .transform((value) => {
            const cleaned = ('' + value).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3];
            }
            return value;
        }).matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'The phone number must be valid'),
    address: yup.string().required('The address is required'),
    city: yup.string().required('The city is required'),
    state: yup.string().required('The state is required'),
    zip_code: yup.string().required('The zip code is required').test('valid_zip_code','The zip code must be valid', (value) => {
        return /^[0-9]{5}$/.test(value); 
    } ),  
});

const ChangeOrderShippingForm = ({data}) => {
    const [updateError, setupdateError] = useState(); 
    const router = useRouter();
    const searchParams = useSearchParams();

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, trigger, setValue} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData, e) => {
        console.log('Form Data:', { ...formData});
        e.preventDefault()
        await schema.validate(formData)
        const shipping_info = {
            ...formData,
        }        
        try {
            await updateOrderShippingInfo(shipping_info, data.id)
            toast.success(`Shipping information updated succesfully`) 
            reset()
            const currentParams = new URLSearchParams(searchParams.toString());
            currentParams.delete('edit');
            router.replace(`?${currentParams.toString()}`, undefined, { shallow: true }); // Shallow navigation 
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to update the order shipping information, try again')  
        }        
    } 
    
    const handlePhoneChange = (e) => {
        const cleaned = ('' + e.target.value).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            const formattedPhone = '(' + match[1] + ') ' + match[2] + '-' + match[3];
            setValue('contact_phone', formattedPhone, { shouldValidate: true });
        } else {
            setValue('contact_phone', e.target.value, { shouldValidate: true });
        }
    };

    return (
        <div className={styles.update_info_container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.update_form}>          
                <div className={styles.update_form_input_container}>
                    <input {...register('address')} type="text" name="address" id="address" defaultValue={data.shipping_info.address} onBlur={() => {
                        trigger('address'); 
                    }} />
                    <label htmlFor="address">Enter your address</label>
                    <p className={styles.error_updating_info}>{errors.address?.message}</p>
                </div>
                <div className={styles.update_form_input_container}>
                    <input {...register('city')} type="text" name="city" id="city" defaultValue={data.shipping_info.city} onBlur={() => {
                        trigger('city');
                    }} />
                    <label htmlFor="city">Enter the city</label>
                    <p className={styles.error_updating_info}>{errors.city?.message}</p>
                </div>
                <div className={styles.update_form_input_container}>
                    <input {...register('state')} type="text" name="state" id="state" defaultValue={data.shipping_info.state} onBlur={() => {
                        trigger('state'); 
                    }} />
                    <label htmlFor="state">Enter the state</label>
                    <p className={styles.error_updating_info}>{errors.state?.message}</p>
                </div>
                <div className={styles.update_form_input_container}>
                    <input {...register('zip_code')} type="text" name="zip_code" id="zip_code" defaultValue={data.shipping_info.zip_code} onBlur={() => {
                        trigger('zip_code'); 
                    }} />
                    <label htmlFor="zip_code">Enter a valid zip code</label>
                    <p className={styles.error_updating_info}>{errors.zip_code?.message}</p>
                </div>
                <div className={styles.update_form_input_container}>
                    <input {...register('contact_phone')} type="text" name="contact_phone" id="contact_phone" defaultValue={data.shipping_info.phone} onBlur={() => {
                        trigger('contact_phone'); 
                    }} onChange={handlePhoneChange}/>
                    <label htmlFor="contact_phone">Enter phone number</label>
                    <p className={styles.error_updating_info}>{errors.contact_phone?.message}</p>
                </div>
                <div className={styles.buttons_profile_container}>
                    <button type="submit" className={styles.pay_button} disabled={isSubmitting}>Update</button>
                </div>
                <div>
                    <p className={styles.error_updating_info}>{updateError}</p>
                </div>
            </form>    
        </div>        
    )
}

export default ChangeOrderShippingForm

/*<form className={styles.checkoutForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.checkoutInfo}>
                <div className={styles.checkoutBoxes}>
                    <h4>Select Contact Phone Number</h4>
                    {data.user.phones?.map((phone, index) => (
                        <div key={index} className={styles.radioInput}>
                            <input
                                type="radio"
                                value={phone.phone}
                                {...register('contact_phone')}
                            />
                            <label>{phone.phone}</label>
                        </div>
                    ))}
                    {errors.contact_phone && <p className={styles.error_updating_info}>{errors.contact_phone.message}</p>}
                </div>
                <div className={styles.checkoutBoxes}>
                    <h4>Select Shipping Address</h4>
                    {data.user.addresses?.map((address, index) => (
                        <div key={index} className={styles.radioInput}>
                            <input
                                type="radio"
                                onClick={() => handleAddressSelect(address)}
                                name="address_info"
                            />
                            <label>{address.address}, {address.city} - {address.state}, {address.zip_code}</label>        
                        </div>
                    ))}
                    {errors.address_info && <p className={styles.error_updating_info}>{errors.address_info.message}</p>}
                </div>
                <input type="hidden" {...register('address')} />
                <input type="hidden" {...register('city')} />
                <input type="hidden" {...register('state')} />
                <input type="hidden" {...register('zip_code')} />
                <div>

                </div>
            </div>            
            <button type='submit' disabled={isSubmitting} className={styles.pay_button}>Update</button>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </form> */