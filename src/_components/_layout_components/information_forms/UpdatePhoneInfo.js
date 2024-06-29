'use client'

import styles from './components.module.css'
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updatePersonalInfo } from '@/actions/userRequests';
import { toast } from 'react-toastify';

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

export default function UpdatePhoneInfo({resourceType, resourceId, phone}) {
    const [updateError, setupdateError] = useState();
    const router = useRouter();

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset, trigger} =useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        await schema.validate(data);
        try {
            await updatePersonalInfo(data, resourceType, resourceId);
            reset()
            router.push("/account/profile/contact_inf");
            toast.success(`Contact information updated succesfully`)
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to update contact information')
        }             
    };

    const onCancel = async () => {         
        reset()
        router.push("/account/profile/contact_inf");
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
        <main className={styles.edit_profile_main_container}>
            <div className={styles.update_info_container}>
                <h2>Edit your contact information</h2>
                <form action="." onSubmit={handleSubmit(onSubmit)} className={styles.update_form}>          
                    <div className={styles.update_form_input_container}>
                        <input {...register('phone')} type="text" name="phone" id="phone" defaultValue={phone[0].phone} onBlur={() => {
                            trigger('phone'); 
                        }} onChange={handlePhoneChange}/>
                        <label htmlFor="phone">Enter phone number</label>
                        <p className={styles.error_updating_info}>{errors.phone?.message}</p>
                    </div>
                    <div className={styles.buttons_profile_container}>
                        <button type="submit" className={styles.update_button} disabled={isSubmitting}>Update</button>
                        <button onClick={()=> onCancel()} className={styles.cancel_update_button}>Cancel</button>
                    </div>
                </form>        
            </div>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </main>
    );
}