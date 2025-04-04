'use client'

import { updateOrderShippingInfo } from '@/actions/ordersRequest';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { forceLogOut } from '@/lib/forceLogout';
import styles from './components.module.css';

const schema = yup.object().shape({
    phone: yup.string().required('The phone is required and must be valid')
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
    zip_code: yup.string().required('The zip code is required').test('valid_zip_code', 'The zip code must be valid', (value) => {
        return /^[0-9]{5}$/.test(value); 
    }),  
});

const ChangeOrderShippingForm = ({ data, handleClose }) => {
    const [updateError, setupdateError] = useState();

    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, dirtyFields }, trigger, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: data.shipping_info
    });

    const onSubmit = async (formData) => {
        const updatedData = Object.keys(dirtyFields).reduce((acc, key) => {
            acc[key] = formData[key];
            return acc;            
        }, {});

        if (!isDirty) { 
            handleClose();           
            return;
        }

        await schema.validate(formData);         
        try {
            const response = await updateOrderShippingInfo(updatedData, data.id);
            if (response.expired) {
                toast.error('Your session has expired, please login again');
                await forceLogOut(handleClose);
            } else {
                handleClose();
                toast.success(`Shipping information updated successfully`);                  
            } 
        } catch (error) {
            console.log(error);
            setupdateError(error.message);
            toast.error('Failed to update the order shipping information, try again');  
        }        
    };

    const handleOnCancel = (e) => {
        e.preventDefault();
        handleClose();
    };
    
    const handlePhoneChange = (e) => {
        const cleaned = ('' + e.target.value).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            const formattedPhone = '(' + match[1] + ') ' + match[2] + '-' + match[3];
            setValue('phone', formattedPhone, { shouldValidate: true, shouldDirty: true });
        } else {
            setValue('phone', e.target.value, { shouldValidate: true, shouldDirty: true });
        }
    };

    return (
        <div className={styles.update_info_container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.update_form}>          
                <div className={styles.update_form_input_container}>
                    <input {...register('address')} type="text" name="address" id="address" onBlur={() => {
                        trigger('address'); 
                    }} />
                    <div className={styles.error_label_container}>
                        <label htmlFor="address">Enter your address</label>
                        <p className={styles.error_updating_info}>{errors.address?.message}</p>
                    </div>
                </div>
                <div className={styles.update_form_input_container}>
                    <input {...register('city')} type="text" name="city" id="city" onBlur={() => {
                        trigger('city');
                    }} />
                    <div className={styles.error_label_container}>
                        <label htmlFor="city">Enter the city</label>
                        <p className={styles.error_updating_info}>{errors.city?.message}</p>
                    </div>
                </div>
                <div className={styles.update_form_input_container}>
                    <input {...register('state')} type="text" name="state" id="state" onBlur={() => {
                        trigger('state'); 
                    }} />
                    <div className={styles.error_label_container}>
                        <label htmlFor="state">Enter the state</label>
                        <p className={styles.error_updating_info}>{errors.state?.message}</p>
                    </div>
                </div>
                <div className={styles.update_form_input_container}>
                    <input {...register('zip_code')} type="text" name="zip_code" id="zip_code" onBlur={() => {
                        trigger('zip_code'); 
                    }} />
                    <div className={styles.error_label_container}>
                        <label htmlFor="zip_code">Enter a valid zip code</label>
                        <p className={styles.error_updating_info}>{errors.zip_code?.message}</p>
                    </div>
                </div>
                <div className={styles.update_form_input_container}>
                    <input {...register('phone')} type="text" name="phone" id="phone" onBlur={() => {
                        trigger('phone'); 
                    }} onChange={handlePhoneChange} />
                    <div className={styles.error_label_container}>
                        <label htmlFor="phone">Enter phone number</label>
                        <p className={styles.error_updating_info}>{errors.phone?.message}</p>
                    </div>
                </div>
                <div className={styles.buttons_profile_container}>
                    <button type="submit" className={styles.pay_button} disabled={isSubmitting}>Update</button>
                    <button type='button' className={styles.cancel_update_button} onClick={(e) => handleOnCancel(e)}>Cancel</button>
                </div>
                <div>
                    <p className={styles.error_updating_info}>{updateError}</p>
                </div>
            </form>    
        </div>        
    );
};

export default ChangeOrderShippingForm;
