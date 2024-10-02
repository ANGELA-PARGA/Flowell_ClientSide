'use client'
import { useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useForm } from 'react-hook-form';
import { StoreContext } from '@/context';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { addDays, addBusinessDays, getDay} from 'date-fns';
import { createNewOrder } from '@/actions/ordersRequest';
import styles from './components.module.css';

const schema = yup.object().shape({
    contact_info_id: yup.number().required('Please select a phone number'),
    shipping_address_id: yup.number().required('Please select a shipping address'),    
    delivery_date: yup.date().required('Please select a delivery date').nullable(),
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({data}) => {
    const [updateError, setupdateError] = useState();
    const { populateCartData } = useContext(StoreContext);    
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData, e) => {
        console.log('Form Data:', { ...formData});

        e.preventDefault()
        const shipping_info = {
            ...formData,
        }
        await schema.validate(shipping_info)

        try {
            const stripeCheckoutUrl = await createNewOrder(shipping_info);
            window.location.href = stripeCheckoutUrl;
        } catch (error) {
            console.log(error)
            setupdateError(error.message)
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
                                {...register('contact_info_id')}
                            />
                            <label>{phone.phone}</label>
                        </div>
                    ))}
                    {errors.contact_info_id && <p className={styles.error_updating_info}>{errors.contact_info_id.message}</p>}
                </div>
                <div className={styles.checkoutBoxes}>
                    <h4>Select Shipping Address</h4>
                    {data.addresses?.map((address, index) => (
                    <div key={index} className={styles.radioInput}>
                        <input
                            type="radio"
                            value={Number(address.addressID)}
                            {...register('shipping_address_id')}
                        />
                        <label>{address.address}, {address.city} - {address.state}, {address.zip_code}</label>        
                    </div>
                    ))}
                    {errors.shipping_address_id && <p className={styles.error_updating_info}>{errors.shipping_address_id.message}</p>}
                </div>
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
            <button type='submit' disabled={isSubmitting} className={styles.pay_button}>Pay</button>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </form>
    )
}

export default CheckoutForm