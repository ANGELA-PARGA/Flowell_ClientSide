'use client'

import styles from './components.module.css'
import {useForm} from 'react-hook-form'
import { useState } from "react";
import { emailSchema } from './validations';
import { yupResolver } from "@hookform/resolvers/yup";
import { sentResetEmail } from '@/actions/userRequests';
import { toast } from 'react-toastify';

export default function RecoverPasswordForm({handleClose, setMessage, closeModal}) {  
    const [recoveryError, setRecoveryError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger } = useForm({
        resolver: yupResolver(emailSchema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await sentResetEmail(data);
            setMessage(response.message)
            handleClose()            
        } catch (error) {
            console.error(error);
            setRecoveryError(error.message)
            toast.error('Failed to send reset email')
        }
    }


    return (
        <main className={`${styles.login_inside_signup_container} flex-col-gap-xl`}>
            <div className={styles.signup_form_container}>
                <form onSubmit={handleSubmit(onSubmit)} className={`${styles.signup_form} flex-col-gap`}>         
                    <div>
                        <input {...register('email')} type="email" name="email" id="email" placeholder="Email*" onBlur={() => {
                            trigger('email'); 
                        }}/>
                        <div className={styles.error_label_container}>
                            <label htmlFor="email">Enter your email</label>
                            <p className={styles.error_signup_form}>{errors.email?.message}</p>
                        </div>
                    </div> 
                    <div className={`${styles.buttons_profile_container} flex-row-gap`}>
                        <button type="submit" disabled={isSubmitting} className="btn_primary_standard btn_sizeS">Sent reset link</button>
                        <button className="btn_primary_standard btn_sizeS btn-destructive" onClick={closeModal} >Cancel</button>
                    </div>                    
                </form>        
            </div>
            <div>
                <p className={styles.error_login_form}>{recoveryError}</p>
            </div>
        </main>
    );
}
