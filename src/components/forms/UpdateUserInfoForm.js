'use client'

import styles from './components.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaOptions } from './validations';
import { schemaFields} from './configFormFields';
import { useUpdateFormAction } from '@/hooks/useUpdateFormAction';
import { UPDATE_FORM, ADD_FORM } from '@/components/forms/const'


export default function UpdateUserInfoForm({ 
    formType,
    resourceType, 
    handleClose, 
    action = null, 
    resource = null
}) {
    const schema = schemaOptions[resourceType]
    const fields = schemaFields[resourceType]

    const { onSubmit, formError } = useUpdateFormAction(
        action,
        resourceType,        
        handleClose
    );
    
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting, isDirty, dirtyFields }, trigger } = useForm({
        resolver: yupResolver(schema),
        defaultValues: (formType === UPDATE_FORM && resource) || {}
    });

    const onFormSubmit = async (data) => {
        console.log('Form data before processing:', data);
        console.log('Dirty fields:', dirtyFields);
        console.log('Is form dirty?', isDirty);
        if(formType === UPDATE_FORM && !isDirty) {
            handleClose();
            return;
        }

        const updatedData = Object.keys(dirtyFields).reduce((acc, key) => {
            acc[key] = data[key];
            return acc;            
        }, {});

        if(formType === ADD_FORM) {
            await onSubmit(data);
            return;
        }
        await onSubmit(updatedData);
    }


    return (
        <section>
            <div className={`${styles.update_info_container} flex-col-gap-sm`}>
                <form onSubmit={handleSubmit(onFormSubmit)} className={`${styles.update_form} flex-col-gap-sm`}>
                    {
                        fields.map(({ key: keyField, label, type, placeholder, onChange }) => (
                            <div key={keyField} className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                                <input
                                    {...register(`${keyField}`)}
                                    type={type}
                                    name={keyField}
                                    id={keyField}
                                    {...(formType === ADD_FORM && { placeholder: placeholder })}
                                    onBlur={() => {
                                        trigger(keyField);
                                    }}
                                    {...(onChange && { onChange: (e) => onChange(e, setValue) })}
                                />
                                <div className={styles.error_label_container}>
                                    <label htmlFor={keyField}>{label}</label>
                                    <p className={styles.error_updating_info}>{errors[keyField]?.message}</p>
                                </div>
                            </div>
                        ))
                    }
                    <div className={`${styles.buttons_profile_container} flex-row-gap`}>
                        <button type="submit" className="btn_primary_standard btn_sizeS" disabled={isSubmitting}>
                            {formType === UPDATE_FORM ? UPDATE_FORM : ADD_FORM}
                        </button>
                        <button type="button" onClick={handleClose} className="btn_primary_standard btn_sizeS btn-destructive">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <p className={styles.error_updating_info}>{formError}</p>
            </div>
        </section>
    );
}