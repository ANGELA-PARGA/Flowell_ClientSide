'use client'
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import addDays from "date-fns/addDays";
import addBusinessDays from "date-fns/addBusinessDays";
import getDay from "date-fns/getDay";
import { createNewOrder } from '@/actions/ordersRequest';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import styles from './components.module.css';

const schema = yup.object().shape({
    phone: yup.string().required('Please select a phone number'),
    address_info: yup.string().required('Please select a shipping address'),
    address: yup.string().required(), 
    city: yup.string().required(),
    state: yup.string().required(),
    zip_code: yup.string().required(),   
    delivery_date: yup.date().required('Please select a delivery date').nullable(),
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({data}) => {
    console.log(data)
    const [updateError, setupdateError] = useState();    
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        const shipping_info = {
            ...formData,
        }
        await schema.validate(shipping_info)

        try {            
            const stripeCheckoutUrl = await createNewOrder(shipping_info);
            if(stripeCheckoutUrl.expired){
                toast.error('Your session has expired, please login again')
                setTimeout(async () => {
                    await signOut({ callbackUrl: '/login' });
                }, 2000);
            } else {
                window.location.href = stripeCheckoutUrl; 
            } 
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

    const handleAddressSelect = (address) => {
        setValue('address', address.address);
        setValue('city', address.city);
        setValue('state', address.state);
        setValue('zip_code', address.zip_code);
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
                    <p>Select one of your phone numbers. If the phone number has a mistypo go to 'Profile Information' and change it</p>
                    {data.phones?.map((phone, index) => (
                        <div key={index} className={styles.radioInput}>
                            <input
                                type="radio"
                                value={phone.phone}
                                {...register('phone')}
                            />
                            <label>{phone.phone}</label>
                        </div>
                    ))}
                    {errors.phone && <p className={styles.error_updating_info}>{errors.phone.message}</p>}
                </div>
                <div className={styles.checkoutBoxes}>
                    <h4>Select Shipping Address</h4>
                    <p>Select one of your addresses. If the address has a mistypo go to 'Profile Information' and change it</p>
                    {data.addresses?.map((address, index) => (
                    <div key={index} className={styles.radioInput}>
                        <input
                            type="radio"
                            onClick={() => handleAddressSelect(address)}
                            name="address_info"
                            {...register('address_info')}
                        />
                        <label>{address.address}, {address.city} - {address.state}, {address.zip_code}</label>        
                    </div>
                    ))}
                    {errors.address_info && <p className={styles.error_updating_info}>{errors.address_info.message}</p>}
                </div>
                {/* Hidden fields for selected address details */}
                <input type="hidden" {...register('address')} />
                <input type="hidden" {...register('city')} />
                <input type="hidden" {...register('state')} />
                <input type="hidden" {...register('zip_code')} />

                <div className={styles.checkoutBoxes}>
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
            <button type='submit' disabled={isSubmitting} className={styles.pay_button}>Pay</button>
            <div>
                <p className={styles.error_updating_info}>{updateError}</p>
            </div>
        </form>
    )
}

export default CheckoutForm