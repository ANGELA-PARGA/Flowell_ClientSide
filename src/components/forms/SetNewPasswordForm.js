'use client'

import styles from './components.module.css'
import {useForm} from 'react-hook-form'
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverPassword } from '@/actions/userRequests';
import { toast } from 'react-toastify';

const schema = yup.object({
    password: yup.string().required('The password is required').
        matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])(?!.*\s).{8,30}$/, 
        'The password must contain: 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character, minimum of 8 characters, maximum of 30 characters'),
    confirmationPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please re-type your password')
})

export default function SetNewPasswordForm() {  
    const [loginError, setLoginError] = useState();
    const [change, setChange] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams()
    const status = searchParams.get('status')

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, trigger } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        await schema.validate(data);
        try {      
            await recoverPassword({...data, status}) 
            setChange(true); 
            toast.success(`Password succesfully changed. You will be redirected to login page!`)  
            setTimeout(() => {
                router.replace('/login');
            }, 5000);   
        } catch (error) {
            setLoginError(error.message);
            toast.error('Failed to change your password, try again')
            reset({password: '', confirmationPassword: ''});      
        }
    };


    return (
        <main className={`${styles.signup_main_container} flex-col-gap-xl`}>
            <div className={styles.signup_form_container}>
                <h2>Change your password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={`${styles.signup_form} flex-col-gap`}>         
                    <div>
                        <input {...register('password')} type="password" name="password" id="password" placeholder="Password*" onBlur={() => {
                            trigger('password'); 
                        }}/>
                        <label htmlFor="password">Enter your new password</label>
                        <p className={styles.error_signup_form}>{errors.password?.message}</p>
                    </div>
                    <div>
                        <input {...register('confirmationPassword')} type="password" name="confirmationPassword" id="confirmationPassword" placeholder="Confirm Password*" onBlur={() => {
                            trigger('confirmationPassword'); 
                        }} />
                        <div className={styles.error_label_container}>
                            <label htmlFor="confirmationPassword">Confirm your new password</label>
                            <p className={styles.error_signup_form}>{errors.confirmationPassword?.message}</p>
                        </div>
                    </div>
                    { !change ? <button type="submit" disabled={isSubmitting} className="btn_primary_standard btn_sizeXl">Submit changes</button> : <></>}
                </form>        
            </div>
            <div>
                <p className={styles.error_login_form}>{loginError}</p>
            </div>
            {change && 
                <section className='signup_after_update_container'>
                    <p className={styles.error_login_form}>Your password has been changed successfully. You will be redirected to login in 5 seconds</p>
                </section>
            }
        </main>
    );
}