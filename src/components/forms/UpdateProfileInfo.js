'use client'

import styles from './components.module.css'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { updatePersonalInfo } from '@/actions/userRequests';
import { toast } from 'react-toastify';
import { forceLogOut } from '@/lib/forceLogout';

export default function UpdateProfileInfo({ resourceType, resourceId, name, handleClose }) {
    const [updateError, setupdateError] = useState();

    const schema = yup.object({
        first_name: yup.string().required('The first name is required'),
        last_name: yup.string().required('The last name is required'),
    });

    const { register, handleSubmit, formState: { errors, isSubmitting }, trigger } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        await schema.validate(data);
        try {
            const response = await updatePersonalInfo(data, resourceType, resourceId);
            if (response.expired) {
                toast.error('Your session has expired, please login again');
                await forceLogOut(handleClose);
            } else {
                handleClose();
                toast.success(`Personal information updated successfully`);
            }
        } catch (error) {
            console.log(error);
            setupdateError(error.message);
            toast.error('Failed to update personal information');
        }
    };

    const onCancel = async (e) => {
        e.preventDefault();
        handleClose();
    };

    return (
        <main>
            <div className={`${styles.update_info_container} flex-col-gap-sm`}>
                <form onSubmit={handleSubmit(onSubmit)} className={`${styles.update_form} flex-col-gap-sm`}>
                    <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                        <input
                            {...register('first_name')}
                            type="text"
                            name="first_name"
                            id="first_name"
                            defaultValue={name.firstName}
                            onBlur={() => {
                                trigger('first_name');
                            }}
                        />
                        <div className={styles.error_label_container}>
                            <label htmlFor="first_name">Enter first name</label>
                            <p className={styles.error_updating_info}>{errors.first_name?.message}</p>
                        </div>
                    </div>
                    <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                        <input
                            {...register('last_name')}
                            type="text"
                            name="last_name"
                            id="last_name"
                            defaultValue={name.lastName}
                            onBlur={() => {
                                trigger('last_name');
                            }}
                        />
                        <div className={styles.error_label_container}>
                            <label htmlFor="last_name">Enter last name</label>
                            <p className={styles.error_updating_info}>{errors.last_name?.message}</p>
                        </div>
                    </div>
                    <div className={`${styles.buttons_profile_container} flex-row-gap`}>
                        <button type="submit" className="btn_primary_standard btn_sizeS" disabled={isSubmitting}>
                            Update
                        </button>
                        <button type="button" onClick={(e) => onCancel(e)} className="btn_primary_standard btn_sizeS btn-destructive">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </main>
    );
}
