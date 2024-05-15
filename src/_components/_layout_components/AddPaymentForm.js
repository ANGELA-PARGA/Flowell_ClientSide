'use client'

import styles from './components.module.css'
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addNewPersonalInfo } from '@/_utilities/userRequests';


export default function AddPaymentForm({resourceType}) {
    const [updateError, setupdateError] = useState();
    const router = useRouter();
    console.log('add form with url data', resourceType)

    const schema = yup.object({
        credit_card: yup.string().required('The credit card number is required'),
        holder: yup.string().required('The holder is required'),
        expiration_date: yup.date().required('The expiration date is required')
    })

    const { register, handleSubmit, formState: { errors }, reset, trigger} =useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log('data to add', data)
        await schema.validate(data);
        try {
            await addNewPersonalInfo(data, resourceType);
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
        }             
        reset()
        router.push("/account/profile/payment_inf");
    };

    const onCancel = async () => {      
        reset()
        router.push("/account/profile/payment_inf");
    };


    return (    
        <section className={styles.edit_profile_main_container}>
            <div className={styles.update_info_container}>
            <h2>Add new credit card information</h2>
            <form action="." onSubmit={handleSubmit(onSubmit)} className={styles.update_form}>          
                    <div className={styles.update_form_input_container}>
                        <input {...register('credit_card')} type="text" name="credit_card" id="credit_card" placeholder='credit card number' onBlur={() => {
                            trigger('credit_card'); 
                        }} />
                        <label htmlFor="credit_card">Enter credit card number</label>
                        <p className={styles.error_updating_info}>{errors.credit_card?.message}</p>
                    </div>
                    <div className={styles.update_form_input_container}>
                        <input {...register('holder')} type="text" name="holder" id="holder" placeholder='holder'  onBlur={() => {
                            trigger('holder');
                        }} />
                        <label htmlFor="holder">Enter holder entity</label>
                        <p className={styles.error_updating_info}>{errors.holder?.message}</p>
                    </div>
                    <div className={styles.update_form_input_container}>
                        <input {...register('expiration_date')} type="date" name="expiration_date" id="expiration_date" onBlur={() => {
                            trigger('expiration_date');
                        }} />
                        <label htmlFor="expiration_date">Enter expiration date</label>
                        <p className={styles.error_updating_info}>{errors.expiration_date?.message}</p>
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
        </section>
    );
}