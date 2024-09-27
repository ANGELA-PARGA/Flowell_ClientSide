'use client'
import {useForm} from 'react-hook-form';
import { useState } from 'react';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { addDays, addBusinessDays, getDay } from 'date-fns';
import styles from './components.module.css'

const schema = yup.object().shape({
    phone: yup.number().required('Please select a phone number'),
    address: yup.number().required('Please select a shipping address'),    
    deliveryDate: yup.date().required('Please select a delivery date').nullable(),
});

const CheckoutForm = ({data}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData, e) => {
        e.preventDefault()
        console.log('Form Data:', { ...formData, deliveryDate: selectedDate });
    };
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setValue('deliveryDate', date); 
    };

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    };

    return (
        <form className={styles.checkoutForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.checkoutInfo}>
                <div className={styles.checkoutBoxes}>
                    <h4>Personal Information</h4>
                    <p>{data.first_name} {data.last_name}</p>
                    <p>{data.email}</p>
                </div>
                <div className={styles.checkoutBoxes}>
                    <h4>Select Contact Phone Number</h4>
                    {data.phones?.map((phone, index) => (
                        <div key={index} className={styles.radioInput}>
                            <input
                                type="radio"
                                value={Number(phone.phoneID)}
                                {...register('phone')}
                            />
                            <label>{phone.phone}</label>
                        </div>
                    ))}
                    {errors.phone && <p className={styles.error_updating_info}>{errors.phone.message}</p>}
                </div>
                <div className={styles.checkoutBoxes}>
                    <h4>Select Shipping Address</h4>
                    {data.addresses?.map((address, index) => (
                    <div key={index} className={styles.radioInput}>
                        <input
                            type="radio"
                            value={Number(address.addressID)}
                            {...register('address')}
                        />
                        <label>{address.address}, {address.city} - {address.state}, {address.zip_code}</label>        
                    </div>
                    ))}
                    {errors.address && <p className={styles.error_updating_info}>{errors.address.message}</p>}
                </div>
                <div className={styles.checkoutBoxes}>
                    <h4>Select Shipping Date</h4>
                    <ReactDatePicker
                        showIcon
                        closeOnScroll={true}
                        selected={selectedDate}
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
                    {errors.deliveryDate && <p className={styles.error_updating_info}>{errors.deliveryDate.message}</p>}
                </div>
            </div>
            <div className={styles.checkoutBoxes}>
                Payment options
            </div>
            <button type='submit' disabled={isSubmitting}>Pay</button>
        </form>
    )
}

export default CheckoutForm