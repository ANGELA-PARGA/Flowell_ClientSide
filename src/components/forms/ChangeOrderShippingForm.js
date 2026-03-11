'use client'

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { orderSchema } from './validations';
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { forceLogOut } from '@/lib/forceLogout';
import { updateOrderShipping } from '@/store/orders/thunks';
import styles from './components.module.css';

const ChangeOrderShippingForm = ({ data, id, handleClose }) => {
    const dispatch = useDispatch();
    const [updateError, setupdateError] = useState();

    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, dirtyFields }, trigger, setValue } = useForm({
        resolver: yupResolver(orderSchema),
        defaultValues: data
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

        await orderSchema.validate(formData);
        handleClose();

        try {
            await dispatch(updateOrderShipping({ 
                orderId: id, 
                data: updatedData 
            })).unwrap();
            
            toast.success('Shipping information updated successfully');
        } catch (error) {
            if (error === 'Session expired') {
                toast.error('Your session has expired, please login again');
                await forceLogOut();
            } else {
                toast.error('Failed to update the order shipping information, try again');
            }
            setupdateError(error);
        }        
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
        <div className={`${styles.update_info_container} flex-col-gap-sm`}>
            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.update_form} flex-col-gap-sm`}>          
                <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                    <input {...register('address')} type="text" name="address" id="address" onBlur={() => {
                        trigger('address'); 
                    }} />
                    <div className={styles.error_label_container}>
                        <label htmlFor="address">Enter your address</label>
                        <p className={styles.error_updating_info}>{errors.address?.message}</p>
                    </div>
                </div>
                <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                    <input {...register('city')} type="text" name="city" id="city" onBlur={() => {
                        trigger('city');
                    }} />
                    <div className={styles.error_label_container}>
                        <label htmlFor="city">Enter the city</label>
                        <p className={styles.error_updating_info}>{errors.city?.message}</p>
                    </div>
                </div>
                <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                    <input {...register('state')} type="text" name="state" id="state" onBlur={() => {
                        trigger('state'); 
                    }} />
                    <div className={styles.error_label_container}>
                        <label htmlFor="state">Enter the state</label>
                        <p className={styles.error_updating_info}>{errors.state?.message}</p>
                    </div>
                </div>
                <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                    <input {...register('zip_code')} type="text" name="zip_code" id="zip_code" onBlur={() => {
                        trigger('zip_code'); 
                    }} />
                    <div className={styles.error_label_container}>
                        <label htmlFor="zip_code">Enter a valid zip code</label>
                        <p className={styles.error_updating_info}>{errors.zip_code?.message}</p>
                    </div>
                </div>
                <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                    <input {...register('phone')} type="text" name="phone" id="phone" onBlur={() => {
                        trigger('phone'); 
                    }} onChange={handlePhoneChange} />
                    <div className={styles.error_label_container}>
                        <label htmlFor="phone">Enter phone number</label>
                        <p className={styles.error_updating_info}>{errors.phone?.message}</p>
                    </div>
                </div>
                <div className={`${styles.buttons_profile_container} flex-row-gap`}>
                    <button type="submit" className="btn_primary_standard btn_sizeS alignCenter" disabled={isSubmitting}>Update</button>
                    <button type='button' className="btn_primary_standard btn_sizeS btn-destructive" onClick={handleClose}>Cancel</button>
                </div>
                <div>
                    <p className={styles.error_updating_info}>{updateError}</p>
                </div>
            </form>    
        </div>        
    );
};

export default ChangeOrderShippingForm;
