'use client'

import styles from './components.module.css'
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updatePersonalInfo } from '@/_utilities/userRequests';


export default function UpdatePhoneInfo({resourceType, resourceId, phone}) {
    const [updateError, setupdateError] = useState();
    const router = useRouter();

    const schema = yup.object({
        phone: yup.string().required('The phone is required and must be valid'),
    })

    const { register, handleSubmit, formState: { errors }, reset, trigger} =useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        await schema.validate(data);
        try {
            await updatePersonalInfo(data, resourceType, resourceId);
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
        }             
        reset()
        router.push("/account/profile/contact_inf");
    };

    const onCancel = async () => {         
        reset()
        router.push("/account/profile/contact_inf");
    };

    return (    
        <main className={styles.edit_profile_main_container}>
            <div className={styles.update_info_container}>
                <h2>Edit your contact information</h2>
                <form action="." onSubmit={handleSubmit(onSubmit)} className={styles.update_form}>          
                    <div className={styles.update_form_input_container}>
                        <input {...register('phone')} type="text" name="phone" id="phone" defaultValue={phone[0].phone} onBlur={() => {
                            trigger('phone'); 
                        }} />
                        <label htmlFor="phone">Enter phone number</label>
                        <p className={styles.error_updating_info}>{errors.phone?.message}</p>
                    </div>
                    <div className={styles.buttons_profile_container}>
                        <button type="submit" className={styles.update_button}>Update</button>
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