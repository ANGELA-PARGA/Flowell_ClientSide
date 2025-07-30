'use client'

import styles from './components.module.css'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { updatePersonalInfo } from '@/actions/userRequests';
import { forceLogOut } from '@/lib/forceLogout';
import { toast } from 'react-toastify';

const schema = yup.object({
    address: yup.string().required('The address is required'),
    city: yup.string().required('The city is required'),
    state: yup.string().required('The state is required'),
    zip_code: yup.string().required('The zip code is required').test('valid_zip_code', 'The zip code must be valid', (value) => {
        return /^[0-9]{5}$/.test(value);
    }),
});

export default function UpdateAddressInfo({ resourceType, resourceId, address, handleClose }) {
    const [updateError, setupdateError] = useState();

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
                toast.success(`Address information updated successfully`);
            }
        } catch (error) {
            console.log(error);
            setupdateError(error.message);
            toast.error('Failed to update address information');
        }
    };

    const onCancel = async (e) => {
        e.preventDefault();
        handleClose();
    };

    return (
        <main className={styles.edit_profile_main_container}>
            <div className={`${styles.update_info_container} flex-col-gap-sm`}>
                <form onSubmit={handleSubmit(onSubmit)} className={`${styles.update_form} flex-col-gap-sm`}>
                    <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                        <input
                            {...register('address')}
                            type="text"
                            name="address"
                            id="address"
                            defaultValue={address.address}
                            onBlur={() => {
                                trigger('address');
                            }}
                        />
                        <div className={styles.error_label_container}>
                            <label htmlFor="address">Enter your address</label>
                            <p className={styles.error_updating_info}>{errors.address?.message}</p>
                        </div>
                    </div>
                    <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                        <input
                            {...register('city')}
                            type="text"
                            name="city"
                            id="city"
                            defaultValue={address.city}
                            onBlur={() => {
                                trigger('city');
                            }}
                        />
                        <div className={styles.error_label_container}>
                            <label htmlFor="city">Enter the city</label>
                            <p className={styles.error_updating_info}>{errors.city?.message}</p>
                        </div>
                    </div>
                    <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                        <input
                            {...register('state')}
                            type="text"
                            name="state"
                            id="state"
                            defaultValue={address.state}
                            onBlur={() => {
                                trigger('state');
                            }}
                        />
                        <div className={styles.error_label_container}>
                            <label htmlFor="state">Enter the state</label>
                            <p className={styles.error_updating_info}>{errors.state?.message}</p>
                        </div>
                    </div>
                    <div className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                        <input
                            {...register('zip_code')}
                            type="text"
                            name="zip_code"
                            id="zip_code"
                            defaultValue={address.zip_code}
                            onBlur={() => {
                                trigger('zip_code');
                            }}
                        />
                        <div className={styles.error_label_container}>
                            <label htmlFor="zip_code">Enter a valid zip code</label>
                            <p className={styles.error_updating_info}>{errors.zip_code?.message}</p>
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