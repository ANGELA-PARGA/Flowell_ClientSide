'use client'

import styles from './components.module.css'
import {useForm} from 'react-hook-form'
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { sentResetEmail } from '@/actions/userRequests';
import { toast } from 'react-toastify';

const schema = yup.object({
    email: yup.string().email('Email format is not valid').required('The email is required')
})

export default function RecoverPasswordForm({handleClose, setMessage, closeModal}) {  
    const [recoveryError, setRecoveryError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        await schema.validate(data);
        try {
            const response = await sentResetEmail(data);
            console.log(response)
            setMessage(response.message)
            handleClose()            
        } catch (error) {
            console.error(error);
            setRecoveryError(error.message)
            toast.error('Failed to update address information')
        }
    }


    return (
        <main className={styles.login_inside_signup_container}>
            <div className={styles.signup_form_container}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.signup_form}>         
                    <div>
                        <input {...register('email')} type="email" name="email" id="email" placeholder="Email*" onBlur={() => {
                            trigger('email'); 
                        }}/>
                        <div className={styles.error_label_container}>
                            <label htmlFor="email">Enter your email</label>
                            <p className={styles.error_signup_form}>{errors.email?.message}</p>
                        </div>
                    </div> 
                    <div className={styles.buttons_profile_container}>
                        <button type="submit" disabled={isSubmitting} className={styles.update_button}>Sent reset link</button>
                        <button className={styles.cancel_update_button} onClick={closeModal} >Cancel</button>
                    </div>                    
                </form>        
            </div>
            <div>
                <p className={styles.error_login_form}>{recoveryError}</p>
            </div>
        </main>
    );
}
