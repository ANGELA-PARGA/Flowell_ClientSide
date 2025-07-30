'use client'

import Link from "next/link";
import styles from './components.module.css'
import {useForm} from 'react-hook-form'
import { useState, useContext } from "react";
import { StoreContext } from "@/context";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "@/actions/registerUser";
import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';

const schema = yup.object({
    first_name: yup.string().required('The first name is required').min(1,'must be at least 1 character long').max(40, 'must be max 40 character long').matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s@!#$%^*()_+{}\[\]:;,.?/|\\'-]{1,30}$/, 'The name must not contain special characters ! # < % >'),
    last_name: yup.string().required('The last name is required').min(1, 'must be at least 1 character long').max(40, 'must be max 40 character long').matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s@!#$%^*()_+{}\[\]:;,.?/|\\'-]{1,30}$/, 'The name must not contain special characters ! # < % >'),
    email: yup.string().email('Email format is not valid').required('The email is required'),
    password: yup.string().required('The password is required').
        matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])(?!.*\s).{8,30}$/, 
        'The password must contain: 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character, minimum of 8 characters, maximum of 30 characters'),
    confirmationPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please re-type your password')
})

export default function RegisterUserForm() {  
    const [loginError, setLoginError] = useState();
    const router = useRouter();
    const { populateCartData } = useContext(StoreContext);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, trigger } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        await schema.validate(data);
        try {      
            await registerUser(data)
            const responseNextAuth = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (responseNextAuth?.error) {
                console.log(responseNextAuth)
                throw new Error(responseNextAuth.error)
            }   
            reset()
            await populateCartData();
            router.push("/"); 
            toast.success(`Account succesfully created!`)     
        } catch (error) {
            setLoginError(error.message);
            toast.error('Failed to register the user account, try again')      
        }
    };


    return (
        <main className={`${styles.signup_main_container} flex-col-gap-xl`}>
            <div className={styles.signup_form_container}>
                <h2>Become a Flowell Member</h2>
                <br />
                <form onSubmit={handleSubmit(onSubmit)} className={`${styles.signup_form} flex-col-gap`}>
                    <div>
                        <input {...register('first_name')} type="text" name="first_name" id="first_name" placeholder="First Name*" onBlur={() => {
                            trigger('first_name'); 
                        }}/>
                        <div className={styles.error_label_container}>
                            <label htmlFor="first_name">First name</label>
                            <p className={styles.error_signup_form}>{errors.first_name?.message}</p>
                        </div>
                    </div>
                    <div>
                        <input {...register('last_name')} type="text" name="last_name" id="last_name" placeholder="Last Name*" onBlur={() => {
                            trigger('last_name'); 
                        }}/>
                        <div className={styles.error_label_container}>
                            <label htmlFor="last_name">Last Name</label>
                            <p className={styles.error_signup_form}>{errors.last_name?.message}</p>
                        </div>
                    </div>          
                    <div>
                        <input {...register('email')} type="email" name="email" id="email" placeholder="Email*" onBlur={() => {
                            trigger('email'); 
                        }}/>
                        <div className={styles.error_label_container}>
                            <label htmlFor="email">Enter your email</label>
                            <p className={styles.error_signup_form}>{errors.email?.message}</p>
                        </div>  
                    </div>
                    <div>
                        <input {...register('password')} type="password" name="password" id="password" placeholder="Password*" onBlur={() => {
                            trigger('password'); 
                        }}/>
                        <div className={styles.error_label_container}>
                            <label htmlFor="password">Enter your password</label>
                            <p className={styles.error_signup_form}>{errors.password?.message}</p>
                        </div>
                    </div>
                    <div>
                        <input {...register('confirmationPassword')} type="password" name="confirmationPassword" id="confirmationPassword" placeholder="Confirm Password*" onBlur={() => {
                            trigger('confirmationPassword'); 
                        }} />
                        <div className={styles.error_label_container}>
                            <label htmlFor="confirmationPassword">Confirm your password</label>
                            <p className={styles.error_signup_form}>{errors.confirmationPassword?.message}</p>
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn_primary_standard btn_sizeXl">Sign up</button>
                </form>        
            </div>
            <div>
                <p className={styles.error_login_form}>{loginError}</p>
            </div>
            <section className={`${styles.login_inside_signup_container} flex-col-gap-xl`}>
                <h2>Already registered?</h2>
                <Link href={"/login"}>Sign in</Link>
            </section>
        </main>
    );
}
