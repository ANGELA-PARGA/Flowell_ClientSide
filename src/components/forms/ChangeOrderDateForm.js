'use client'

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { deliveryDateSchema } from './validations';
import { yupResolver } from "@hookform/resolvers/yup";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import addDays from "date-fns/addDays";
import addBusinessDays from "date-fns/addBusinessDays";
import getDay from "date-fns/getDay";
import { forceLogOut } from '@/lib/forceLogout';
import { updateOrderDeliveryDate } from '@/store/orders/thunks';
import { toast } from 'react-toastify';
import styles from './components.module.css';

const ChangeOrderDateForm = ({id, handleClose}) => {
    const dispatch = useDispatch();
    const [updateError, setupdateError] = useState();

    const { handleSubmit, formState: { errors, isSubmitting }, setValue, watch} = useForm({
        resolver: yupResolver(deliveryDateSchema)
    });

    const onSubmit = async (formData) => {
        handleClose();

        try {
            await dispatch(updateOrderDeliveryDate({ 
                orderId: id, 
                data: formData 
            })).unwrap();
            
            toast.success('Delivery date updated successfully');
        } catch (error) {
            if (error === 'Session expired') {
                toast.error('Your session has expired, please login again');
                await forceLogOut();
            } else {
                toast.error('Failed to update the delivery date, try again');
            }
            setupdateError(error);
        }        
    }
   
    const handleDateChange = (date) => {
        setValue('delivery_date', date, { shouldValidate: true }); 
    };

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6 && day !== 1;
    };

    return (
        <form className={`${styles.checkoutForm} flex-col-gap`} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.checkoutInfo} flex-col-gap`}>
                <div className={`${styles.checkoutBoxes} flex-col-gap`}>
                    <h4>Select Shipping Date</h4>
                    <ReactDatePicker
                        showIcon
                        closeOnScroll={true}
                        selected={watch('delivery_date')}
                        onChange={handleDateChange}
                        minDate={addBusinessDays(new Date(), 5)}
                        maxDate={addDays(new Date(), 90)}
                        filterDate={isWeekday}
                        dateFormat="MM-dd-yyyy"
                        className={styles.customDatePicker}
                        placeholderText="Select a date"
                    >
                        <p className={styles.error_updating_info}>We recommend select the delivery day 3 days before the event</p> 
                    </ReactDatePicker>
                    {errors.delivery_date && <p className={styles.error_updating_info}>{errors.delivery_date.message}</p>}
                </div>
            </div>  
            <div className={`${styles.buttons_profile_container} flex-row-gap`}>
                <button type='submit' disabled={isSubmitting} className="btn_primary_standard btn_sizeS alignCenter">Update</button>
                <button type='button' className="btn_primary_standard btn_sizeS btn-destructive" onClick={handleClose}>Cancel</button>
            </div>         
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </form>
    )
}

export default ChangeOrderDateForm