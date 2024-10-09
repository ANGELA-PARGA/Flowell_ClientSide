'use client'

import styles from './components.module.css'
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { updatePersonalInfo } from '@/actions/userRequests';
import { toast } from 'react-toastify';


export default function UpdateProfileInfo({resourceType, resourceId, name}) {
    const [updateError, setupdateError] = useState();
    const router = useRouter();
    const searchParams = useSearchParams();

    const schema = yup.object({
        first_name: yup.string().required('The first name is required'),
        last_name: yup.string().required('The last name is required'),
    })

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, trigger} =useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        await schema.validate(data);
        try {
            await updatePersonalInfo(data, resourceType, resourceId);
            toast.success(`Personal information updated succesfully`)
            reset()
            const currentParams = new URLSearchParams(searchParams.toString());
            currentParams.delete('edit');
            router.replace(`?${currentParams.toString()}`, undefined, { shallow: true });                 
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to update personal information')
        }             
    };

    const onCancel = async (e) => {    
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('edit');
        router.replace(`?${currentParams.toString()}`);
    };

    return (    
        <main className={styles.edit_profile_main_container}>
            <div className={styles.update_info_container}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.update_form}>          
                    <div className={styles.update_form_input_container}>
                        <input {...register('first_name')} type="text" name="first_name" id="first_name" defaultValue={name.firstName} onBlur={() => {
                            trigger('first_name'); 
                        }} />
                        <label htmlFor="first_name">Enter first name</label>
                        <p className={styles.error_updating_info}>{errors.first_name?.message}</p>
                    </div>
                    <div className={styles.update_form_input_container}>
                        <input {...register('last_name')} type="text" name="last_name" id="last_name" defaultValue={name.lastName}  onBlur={() => {
                            trigger('last_name');
                        }} />
                        <label htmlFor="last_name">Enter last name</label>
                        <p className={styles.error_updating_info}>{errors.last_name?.message}</p>
                    </div>
                    <div className={styles.buttons_profile_container}>
                        <button type="submit" className={styles.update_button} disabled={isSubmitting}>Update</button>
                        <button type="button" onClick={(e)=> onCancel(e)} className={styles.cancel_update_button}>Cancel</button>
                    </div>
                </form>        
            </div>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </main>
    );
}
