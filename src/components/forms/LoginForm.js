'use client'

import Link from "next/link";
import styles from './components.module.css'
import dynamic from 'next/dynamic'
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { StoreContext } from "@/context";
import { toast } from 'react-toastify';

const MyModalRecoverPassword = dynamic(() => import("@/UI/MyModalRecoverPassword"), {ssr: false})

const schema = yup.object({
    email: yup.string().email('Email format is not valid').required('The email is required'),
    password: yup.string().required('The password is required')
})

export default function LoginForm() {
    const [loginError, setLoginError] = useState();
    const router = useRouter();
    const { populateCartData } = useContext(StoreContext);

    const { register, handleSubmit, formState: { errors, isSubmitting}, trigger} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        await schema.validate(data);
        try {
            const responseNextAuth = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (responseNextAuth?.error) {
                console.log(responseNextAuth)
                throw new Error(responseNextAuth.error)
            }
            router.push("/");
            await populateCartData();  
            toast.success(`Login succesfull!`)   
        } catch (error) {
            console.log('error catched:', error.message)
            setLoginError(error.message);
            toast.error('Failed to login to the account, try again')         
        }
    };

    return (    
        <main className={styles.login_main_container}>
            <div className={styles.login_form_container}>
                <h2>Sign in to your account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>          
                    <div>
                        <input {...register('email')} type="email" name="email" id="email" placeholder="Email*" onBlur={() => {
                            trigger('email'); 
                        }} />
                        <div className={styles.error_label_container}>
                            <label htmlFor="email">Enter your email</label> 
                            <p className={styles.error_login_form}>{errors.email?.message}</p>
                        </div>                        
                    </div>
                    <div>
                        <input {...register('password')} type="password" name="password" id="password" placeholder="Password*" onBlur={() => {
                            trigger('password');
                        }} />
                        <div className={styles.error_label_container}>
                            <label htmlFor="password">Enter your password</label>
                            <p className={styles.error_login_form}>{errors.password?.message}</p>
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className={styles.login_submit_button}>Log in</button>
                </form> 
                <MyModalRecoverPassword />
            </div>
            <div>
                <p className={styles.error_login_form}>{loginError}</p>
            </div>
            <section className={styles.signup_inside_login_container}>
                <h2>Not registered yet?</h2>
                <Link href={"/register"}>Become a member</Link>
            </section>
        </main>
    );
}