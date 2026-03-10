'use client'

import styles from './components.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { updatePassword } from '@/actions/userRequests';
import { passwordSchema } from './validations';
import { toast } from 'react-toastify';
import { forceLogOut } from '@/lib/forceLogout';

export default function UpdatePassword({ handleClose, closeModal }) {
    const [updateError, setupdateError] = useState();

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger } = useForm({
        resolver: yupResolver(passwordSchema)
    });

    const onSubmit = async (data) => {
        await passwordSchema.validate(data);
        try {
            const response = await updatePassword(data.password);
            if (response.expired) {
                toast.error('Your session has expired, please login again');
                await forceLogOut(handleClose);
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

    return (
        <main className={`${styles.update_info_container} flex-col-gap-sm`}>
            <div className={`${styles.update_info_container} flex-col-gap-sm`}>
                <form onSubmit={handleSubmit(onSubmit)} className={`${styles.signup_form} flex-col-gap`}>
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
                    <div className={`${styles.buttons_profile_container} flex-row-gap`}>
                        <button type="submit" className="btn_primary_standard btn_sizeS" disabled={isSubmitting}>
                            Update
                        </button>
                        <button type="button" onClick={closeModal} className="btn_primary_standard btn_sizeS btn-destructive">
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