'use client'

import Link from "next/link";
import styles from './components.module.css'
import {useForm} from 'react-hook-form'
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

    const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
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
        <main className={styles.signup_main_container}>
        <div className={styles.signup_form_container}>
            <h2>Become a Flowell Member</h2>
            <form action="." onSubmit={handleSubmit(onSubmit)} className={styles.signup_form}>
            <div>
                <input {...register('first_name')} type="text" name="first_name" id="first_name" placeholder="First Name*" onBlur={() => {
                    trigger('first_name'); 
                }}/>
                <label htmlFor="first_name">First name</label>
                <p className={styles.error_signup_form}>{errors.first_name?.message}</p>
            </div>
            <div>
                <input {...register('last_name')} type="text" name="last_name" id="last_name" placeholder="Last Name*" onBlur={() => {
                    trigger('last_name'); 
                }}/>
                <label htmlFor="last_name">Last Name</label>
                <p className={styles.error_signup_form}>{errors.last_name?.message}</p>
            </div>          
            <div>
                <input {...register('email')} type="email" name="email" id="email" placeholder="Email*" onBlur={() => {
                    trigger('email'); 
                }}/>
                <label htmlFor="email">Enter your email</label>
                <p className={styles.error_signup_form}>{errors.email?.message}</p>
            </div>
            <div>
                <input {...register('password')} type="password" name="password" id="password" placeholder="Password*" onBlur={() => {
                    trigger('password'); 
                }}/>
                <label htmlFor="password">Enter your password</label>
                <p className={styles.error_signup_form}>{errors.password?.message}</p>
            </div>
            <div>
                <input {...register('confirmationPassword')} type="password" name="confirmationPassword" id="confirmationPassword" placeholder="Confirm Password*" onBlur={() => {
                    trigger('confirmationPassword'); 
                }} />
                <label htmlFor="confirmationPassword">Confirm your password</label>
                <p className={styles.error_signup_form}>{errors.confirmationPassword?.message}</p>
            </div>
            <button type="submit" className={styles.signup_submit_button}>Sign up</button>
            </form>        
        </div>
        <section className={styles.login_main_container}>
            <h2>Already registered?</h2>
            <Link href={"/login"}>Sign in</Link>
        </section>
        </main>
    );
}
