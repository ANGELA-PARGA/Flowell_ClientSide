'use client'

import styles from './components.module.css'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { updatePassword } from '@/actions/userRequests';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';

const schema = yup.object({
    password: yup.string().required('The password is required')
        .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])(?!.*\s).{8,30}$/,
            'The password must contain: 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character, minimum of 8 characters, maximum of 30 characters'),
    confirmationPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please re-type your password')
});

export default function UpdatePassword({ handleClose, closeModal }) {
    const [updateError, setupdateError] = useState();

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        console.log('calling update password in form', data);
        await schema.validate(data);
        try {
            const response = await updatePassword(data.password);
            if (response.expired) {
                toast.error('Your session has expired, please login again');
                setTimeout(async () => {
                    handleClose();
                    await signOut({ callbackUrl: '/login' });
                }, 2000);
            } else {
                handleClose();
                toast.success(`Password information updated successfully`);
            }
        } catch (error) {
            console.log(error);
            setupdateError(error.message);
            toast.error('Failed to update password information');
        }
    };

    const onCancel = async (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <main className={styles.update_info_container}>
            <div className={styles.update_info_container}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.signup_form}>
                    <div>
                        <input
                            {...register('password')}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password*"
                            onBlur={() => {
                                trigger('password');
                            }}
                        />
                        <div className={styles.error_label_container}>
                            <label htmlFor="password">Enter your new password</label>
                            <p className={styles.error_signup_form}>{errors.password?.message}</p>
                        </div>
                    </div>
                    <div>
                        <input
                            {...register('confirmationPassword')}
                            type="password"
                            name="confirmationPassword"
                            id="confirmationPassword"
                            placeholder="Confirm Password*"
                            onBlur={() => {
                                trigger('confirmationPassword');
                            }}
                        />
                        <div className={styles.error_label_container}>
                            <label htmlFor="confirmationPassword">Confirm your new password</label>
                            <p className={styles.error_signup_form}>{errors.confirmationPassword?.message}</p>
                        </div>
                    </div>
                    <div className={styles.buttons_profile_container}>
                        <button type="submit" className={styles.update_button} disabled={isSubmitting}>
                            Update
                        </button>
                        <button type="button" onClick={(e) => onCancel(e)} className={styles.cancel_update_button}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <p className={styles.error_login_form}>{updateError}</p>
            </div>
        </main>
    );
}