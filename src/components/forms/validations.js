import * as yup from "yup";

export const nameSchema = yup.object({
    first_name: yup.string().required('The first name is required'),
    last_name: yup.string().required('The last name is required'),
});

export const phoneSchema = yup.object({
    phone: yup
        .string()
        .required('The phone is required and must be valid')
        .transform((value) => {
            const cleaned = ('' + value).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3];
            }
            return value;
        })
        .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'The phone number must be valid')
});

export const addressSchema = yup.object({
    address: yup.string().required('The address is required'),
    city: yup.string().required('The city is required'),
    state: yup.string().required('The state is required'),
    zip_code: yup.string().required('The zip code is required').test('valid_zip_code', 'The zip code must be valid', (value) => {
        return /^[0-9]{5}$/.test(value);
    }),
});

export const passwordSchema = yup.object({
    password: yup.string().required('The password is required')
        .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])(?!.*\s).{8,30}$/,
            'The password must contain: 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character, minimum of 8 characters, maximum of 30 characters'),
    confirmationPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please re-type your password')
});

export const checkoutSchema = yup.object().shape({
    phone: yup.string().required('Please select a phone number'),
    address_info: yup.string().required('Please select a shipping address'),
    address: yup.string().required(), 
    city: yup.string().required(),
    state: yup.string().required(),
    zip_code: yup.string().required(),   
    delivery_date: yup.date().required('Please select a delivery date').nullable(),
});

export const orderSchema = yup.object().shape({
    phone: yup.string().required('The phone is required and must be valid')
        .transform((value) => {
            const cleaned = ('' + value).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3];
            }
            return value;
        }).matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'The phone number must be valid'),
    address: yup.string().required('The address is required'),
    city: yup.string().required('The city is required'),
    state: yup.string().required('The state is required'),
    zip_code: yup.string().required('The zip code is required').test('valid_zip_code', 'The zip code must be valid', (value) => {
        return /^[0-9]{5}$/.test(value); 
    }),  
});

export const deliveryDateSchema = yup.object().shape({   
    delivery_date: yup.date().required('Please select a delivery date').nullable(),
});

export const schemaOptions = {
    name: nameSchema,
    phone: phoneSchema,
    address: addressSchema,
    password: passwordSchema,
    deliveryDate: deliveryDateSchema,
    checkout: checkoutSchema,
    order: orderSchema
};