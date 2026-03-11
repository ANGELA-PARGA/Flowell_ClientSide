const addressFields = [
    {
        key: 'address',
        label: 'Enter the address',
        type: 'text',
        placeholder: 'Enter your address',
        onChange: null
    },{
        key: 'city',
        label: 'Enter the city',
        type: 'text',
        placeholder: 'Enter the city',
        onChange: null
    },{
        key: 'state',
        label: 'Enter the state',
        type: 'text',
        placeholder: 'Enter the state',
        onChange: null
    },{
        key: 'zip_code',
        label: 'Enter the zip code',    
        type: 'text',
        placeholder: 'Enter the zip code',
        onChange: null
    }
]

const phoneFields = [
    {
        key: 'phone',
        label: 'Enter phone number',
        type: 'text',
        placeholder: 'Enter phone number',
        onChange: (e, setValue) => {
            const cleaned = ('' + e.target.value).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                const formattedPhone = '(' + match[1] + ') ' + match[2] + '-' + match[3];
                setValue('phone', formattedPhone, { shouldValidate: true });
            } else {
                setValue('phone', e.target.value, { shouldValidate: true });
            }
        }
    }
]

const nameFields = [
    {
        key: 'first_name',
        label: 'Enter first name',
        type: 'text',
        placeholder: 'Enter first name',
        onChange: null
    },{
        key: 'last_name',
        label: 'Enter last name',
        type: 'text',
        placeholder: 'Enter last name',
        onChange: null
    }
]

const emailFields = [
    {
        key: 'email',
        label: 'Enter email',
        type: 'email',
        placeholder: 'Enter email',
        onChange: null
    }
]

const passwordFields = [
    {
        key: 'password',
        label: 'Enter password',
        type: 'password',
        placeholder: 'Enter password',
        onChange: null
    },{
        key: 'confirmationPassword',
        label: 'Confirm password',
        type: 'password',
        placeholder: 'Confirm password',
        onChange: null
    }
]

const registerFields = [
    ...nameFields,
    ...emailFields,
    ...passwordFields
]

const loginFields = [
    ...emailFields,
    {
        key: 'password',
        label: 'Enter password',
        type: 'password',
        placeholder: 'Enter password',
        onChange: null
    }
]

const orderFields = [
    {
        key: 'address',
        label: 'Enter the address',
        type: 'text',
        placeholder: 'Enter your address',
        onChange: null
    },{
        key: 'city',
        label: 'Enter the city',
        type: 'text',
        placeholder: 'Enter the city',
        onChange: null
    },{
        key: 'state',
        label: 'Enter the state',
        type: 'text',
        placeholder: 'Enter the state',
        onChange: null
    },{
        key: 'zip_code',
        label: 'Enter the zip code',    
        type: 'text',
        placeholder: 'Enter the zip code',
        onChange: null
    },{
        key: 'phone',
        label: 'Enter phone number',
        type: 'text',
        placeholder: 'Enter phone number',
        onChange: (e, setValue) => {
            const cleaned = ('' + e.target.value).replace(/\D/g, '');
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                const formattedPhone = '(' + match[1] + ') ' + match[2] + '-' + match[3];
                setValue('phone', formattedPhone, { shouldValidate: true });
            } else {
                setValue('phone', e.target.value, { shouldValidate: true });
            }
        }
    }
]

export const schemaFields = {
    name: nameFields,
    phone: phoneFields,
    address: addressFields,
    email: emailFields,
    password: passwordFields,
    register: registerFields,
    login: loginFields,
    order: orderFields
}