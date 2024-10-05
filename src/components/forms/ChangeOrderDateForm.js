'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { addDays, addBusinessDays, getDay} from 'date-fns';
import { updateOrderShippingInfo } from '@/actions/ordersRequest';
import { toast } from 'react-toastify';
import styles from './components.module.css';

const schema = yup.object().shape({   
    delivery_date: yup.date().required('Please select a delivery date').nullable(),
});

const ChangeOrderDateForm = ({id}) => {
    const [updateError, setupdateError] = useState();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { handleSubmit, formState: { errors, isSubmitting }, setValue, watch} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData, e) => {
        console.log('Form Data:', { ...formData});
        e.preventDefault()

        const delivery_info = {
            ...formData,
        }
        await schema.validate(delivery_info)

        try {
            await updateOrderShippingInfo(delivery_info, id)
            toast.success(`Delivery date updated succesfully`)   
            
            const currentParams = new URLSearchParams(searchParams.toString());
            currentParams.delete('edit');
            router.replace(`?${currentParams.toString()}`, undefined, { shallow: true }); // Shallow navigation

        } catch (error) {
            console.log(error)
            setupdateError(error.message)
            toast.error('Failed to update the delivery date, try again') 
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
        <form className={styles.checkoutForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.checkoutInfo}>
                <div className={styles.checkoutBoxes}>
                    <h4>Select Shipping Date</h4>
                    <ReactDatePicker
                        showIcon
                        closeOnScroll={true}
                        selected={watch('delivery_date')}
                        onChange={handleDateChange}
                        minDate={addBusinessDays(new Date(), 10)}
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
            <button type='submit' disabled={isSubmitting} className={styles.pay_button}>Update</button>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </form>
    )
}

export default ChangeOrderDateForm