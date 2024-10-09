'use client'

import styles from './components.module.css'
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter,  useSearchParams } from "next/navigation";
import { useState } from "react";
import { addNewPersonalInfo } from '@/actions/userRequests';
import { toast } from 'react-toastify';


const schema = yup.object({
    address: yup.string().required('The address is required').min(3),
    city: yup.string().required('The city is required'),
    state: yup.string().required('The state is required'),
    zip_code: yup.string().required('The zip code is required').test('valid_zip_code','The zip code must be valid', (value) => {
        return /^[0-9]{5}$/.test(value); 
    } ),
})

export default function AddAddressForm({resourceType}) {
    const [updateError, setupdateError] = useState();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { register, handleSubmit, formState: { errors, isSubmitting}, reset, trigger} =useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        await schema.validate(data);
        try {
            await addNewPersonalInfo(data, resourceType);
            toast.success(`Address information added succesfully`)
            reset();
            const currentParams = new URLSearchParams(searchParams.toString());
            currentParams.delete('add');
            router.replace(`?${currentParams.toString()}`, undefined, { shallow: true });  
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to add address information')
        }             
    };

    const onCancel = async (e) => {      
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('add');
        router.replace(`?${currentParams.toString()}`);
    };


    return (    
        <section className={styles.edit_profile_main_container}>
            <div className={styles.update_info_container}>
                <h2>Add new address information</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.update_form}>          
                    <div className={styles.update_form_input_container}>
                        <input {...register('address')} type="text" name="address" id="address" placeholder='address' onBlur={() => {
                            trigger('address'); 
                        }} />
                        <label htmlFor="address">Enter your address</label>
                        <p className={styles.error_updating_info}>{errors.address?.message}</p>
                    </div>
                    <div className={styles.update_form_input_container}>
                        <input {...register('city')} type="text" name="city" id="city" placeholder='city' onBlur={() => {
                            trigger('city');
                        }} />
                        <label htmlFor="city">Enter the city</label>
                        <p className={styles.error_updating_info}>{errors.city?.message}</p>
                    </div>
                    <div className={styles.update_form_input_container}>
                        <input {...register('state')} type="text" name="state" id="state" placeholder='state' onBlur={() => {
                            trigger('state'); 
                        }} />
                        <label htmlFor="state">Enter the state</label>
                        <p className={styles.error_updating_info}>{errors.state?.message}</p>
                    </div>
                    <div className={styles.update_form_input_container}>
                        <input {...register('zip_code')} type="text" name="zip_code" id="zip_code" placeholder='zip code' onBlur={() => {
                            trigger('zip_code'); 
                        }} />
                        <label htmlFor="zip_code">Enter a valid zip code</label>
                        <p className={styles.error_updating_info}>{errors.zip_code?.message}</p>
                    </div>
                    <div className={styles.buttons_profile_container}>
                        <button type="submit" className={styles.update_button} disabled={isSubmitting}>Add</button>
                        <button type="button" onClick={(e)=> onCancel(e)} className={styles.cancel_update_button}>Cancel</button>
                    </div>
                </form>                        
            </div>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </section>
    );
}