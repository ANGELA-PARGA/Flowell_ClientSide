'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import addDays from "date-fns/addDays";
import addBusinessDays from "date-fns/addBusinessDays";
import getDay from "date-fns/getDay";
import { updateOrderDeliverydateInfo } from '@/actions/ordersRequest';
import { forceLogOut } from '@/lib/forceLogout';
import { toast } from 'react-toastify';
import styles from './components.module.css';

const schema = yup.object().shape({   
    delivery_date: yup.date().required('Please select a delivery date').nullable(),
});

const ChangeOrderDateForm = ({id, handleClose}) => {
    const [updateError, setupdateError] = useState();

    const { handleSubmit, formState: { errors, isSubmitting }, setValue, watch} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        await schema.validate(formData)
        const delivery_info = {
            ...formData,
        }

        try {
            const response = await updateOrderDeliverydateInfo(delivery_info, id);
            if(response.expired){
                toast.error('Your session has expired, please login again')
                await forceLogOut(handleClose);
            } else {
                handleClose()
                toast.success(`Delivery date updated succesfully`)  
            }   
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to update the delivery date, try again') 
        }        
    }

    const handleOnCancel = (e) =>{
        e.preventDefault();
        handleClose();
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
                        <p className={styles.error_updating_info}>We recomend select the delivery day 3 days before the event</p> 
                    </ReactDatePicker>
                    {errors.delivery_date && <p className={styles.error_updating_info}>{errors.delivery_date.message}</p>}
                </div>
            </div>  
            <div className={`${styles.buttons_profile_container} flex-row-gap`}>
                <button type='submit' disabled={isSubmitting} className="btn_primary_standard btn_sizeS alignCenter">Update</button>
                <button type='button' className="btn_primary_standard btn_sizeS btn-destructive" onClick={(e) => handleOnCancel(e)}>Cancel</button>
            </div>         
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </form>
    )
}

export default ChangeOrderDateForm