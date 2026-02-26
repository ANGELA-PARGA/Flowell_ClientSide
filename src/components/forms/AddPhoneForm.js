'use client'

import styles from './components.module.css'
import { toast } from 'react-toastify';
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addUserInfo } from '@/store/user/thunks';
import { forceLogOut } from '@/lib/forceLogout';

const schema = yup.object({
    phone: yup
        .string()
        .required('The phone is required and must be valid')
        .transform((value) => {
            const cleaned = ('' + value).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3];
            }
            return value;
        })
        .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'The phone number must be valid')
});


export default function AddPhoneForm({resourceType, handleClose}) {
    const dispatch = useDispatch();
    const [updateError, setupdateError] = useState();

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset, trigger} =useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        console.log('[AddPhoneForm] onSubmit - Entry:', data);
        await schema.validate(data);
        
        // Close modal and reset form immediately for better UX
        handleClose();
        reset();
        
        try {
            // Dispatch thunk - handles optimistic add internally
            await dispatch(addUserInfo({
                data,
                resourceType
            })).unwrap();
            
            console.log('[AddPhoneForm] onSubmit - Success');
            toast.success(`Contact information added successfully`);
        } catch (error) {
            console.error('[AddPhoneForm] onSubmit - Error:', error)
            setupdateError(error.message)
            
            if (error === 'Session expired') {
                console.log('[AddPhoneForm] onSubmit - Session expired, forcing logout');
                toast.error('Your session has expired, please login again');
                await forceLogOut();
            } else {
                toast.error('Failed to add contact information');
            }
        }             
    };

    const onCancel = async (e) => {  
        e.preventDefault();
        handleClose()   
    };

    const handlePhoneChange = (e) => {
        const cleaned = ('' + e.target.value).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            const formattedPhone = '(' + match[1] + ') ' + match[2] + '-' + match[3];
            setValue('phone', formattedPhone, { shouldValidate: true });
        } else {
            setValue('phone', e.target.value, { shouldValidate: true });
        }
    };


    return (    
        <section className={styles.edit_profile_main_container}>
            <div className={`${styles.update_info_container} flex-col-gap-sm`}>
            <h2>Add new contact information</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.update_form} flex-col-gap-sm`}>          
                <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                    <input {...register('phone')} type="text" name="phone" id="phone" placeholder='(000) 000-0000' onBlur={() => {
                        trigger('phone'); 
                    }} onChange={handlePhoneChange}/>
                    <div className={styles.error_label_container}>
                        <label htmlFor="phone">Enter phone number</label>
                        <p className={styles.error_updating_info}>{errors.phone?.message}</p>
                    </div>
                </div>
                <div className={`${styles.buttons_profile_container} flex-row-gap`}>
                    <button type="submit" className="btn_primary_standard btn_sizeS" disabled={isSubmitting}>Add</button>
                    <button onClick={(e)=> onCancel(e)} className="btn_primary_standard btn_sizeS btn-destructive">Cancel</button>  
                </div>
            </form>
            </div>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </section>
    );
}