'use client'

import styles from './components.module.css'
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updatePersonalInfo } from '@/actions/userRequests';
import { toast } from 'react-toastify';

const luhnCheck = (cardNumber) => {
    let arr = (cardNumber + '').split('').reverse().map(x => parseInt(x));
    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce(
      (acc, val, i) => (i % 2 !== 0) ? acc + val : acc + ((val * 2) % 9) || 9,
        0
    );
    sum += lastDigit;
    return sum % 10 === 0;
};

const schema = yup.object({
    credit_card: yup.string().required('The credit card number is required')
    .matches(/^[0-9]+$/, 'Credit card number must contain only digits')
    .test('valid-luhn', 'Credit card number is invalid', value => luhnCheck(value))
    .min(13, 'Credit card number is too short')
    .max(19, 'Credit card number is too long'),
    holder: yup.string().required('The card holder name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Card holder name must contain only letters and spaces')
    .min(2, 'Card holder name is too short')
    .max(50, 'Card holder name is too long'),
    expiration_date: yup.string().required('The expiration date is required') 
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiration date format must be MM/YY')
    .test('valid-date', 'Expiration date is invalid', value => {
        const [month, year] = value.split('/');
        const expiryDate = new Date(`20${year}-${month}-01`);
        const today = new Date();
        return expiryDate > today;
    })
})


export default function UpdateCreditInfo({resourceType, resourceId, creditCard}) {
    const [updateError, setupdateError] = useState();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting}, reset, trigger} =useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        await schema.validate(data);
        try {
            await updatePersonalInfo(data, resourceType, resourceId);
            reset()
            router.push("/account/profile/payment_inf");
            toast.success(`Payment information updated succesfully`)
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to update payment information')
        }             
    };

    const onCancel = async () => {         
        reset()
        router.push("/account/profile/payment_inf");
    };

    return (    
        <main className={styles.edit_profile_main_container}>
            <div className={styles.update_info_container}>
                <h2>Edit your payment information</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.update_form}>          
                    <div className={styles.update_form_input_container}>
                        <input {...register('credit_card')} type="text" name="credit_card" id="credit_card" defaultValue={creditCard[0].credit_card} onBlur={() => {
                            trigger('credit_card'); 
                        }} />
                        <label htmlFor="credit_card">Enter credit card number</label>
                        <p className={styles.error_updating_info}>{errors.credit_card?.message}</p>
                    </div>
                    <div className={styles.update_form_input_container}>
                        <input {...register('holder')} type="text" name="holder" id="holder" defaultValue={creditCard[0].holder}  onBlur={() => {
                            trigger('holder');
                        }} />
                        <label htmlFor="holder">Enter holder entity</label>
                        <p className={styles.error_updating_info}>{errors.holder?.message}</p>
                    </div>
                    <div className={styles.update_form_input_container}>
                        <input {...register('expiration_date')} type="text" name="expiration_date" id="expiration_date" defaultValue={creditCard[0].expiration_date}  onBlur={() => {
                            trigger('expiration_date');
                        }} />
                        <label htmlFor="expiration_date">Enter expiration date</label>
                        <p className={styles.error_updating_info}>{errors.expiration_date?.message}</p>
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