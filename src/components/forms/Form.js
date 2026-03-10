'use client'

import styles from './components.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaOptions } from './validations';
import { schemaFields} from './configFormFields';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { UPDATE_FORM, ADD_FORM } from '@/const'


export default function Form({ 
    formType,
    resourceType, 
    handleClose, 
    action = null, 
    resourceId = null, 
    resource = null
}) {
    const schema = schemaOptions[resourceType]
    const fields = schemaFields[resourceType]

    const { onSubmit, formError } = useFormSubmit(
        schema,
        action,
        resourceType,        
        resourceId,
        handleClose
    );
    

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, trigger } = useForm({
        resolver: yupResolver(schema)
    });


    return (
        <section>
            <div className={`${styles.update_info_container} flex-col-gap-sm`}>
                <form onSubmit={handleSubmit(onSubmit)} className={`${styles.update_form} flex-col-gap-sm`}>
                    {
                        fields.map(({ key: keyField, label, type, placeholder, onChange }) => (
                            <div key={keyField} className={`${styles.update_form_input_container} flex-col-gap-sm`}>
                                <input
                                    {...register(`${keyField}`)}
                                    type={type}
                                    name={keyField}
                                    id={keyField}
                                    {...(formType === UPDATE_FORM && { defaultValue: resource ? resource[keyField] : '' })}
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