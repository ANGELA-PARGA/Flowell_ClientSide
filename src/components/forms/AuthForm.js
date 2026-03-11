'use client'

import styles from './components.module.css'
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic'
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaOptions } from './validations';
import { schemaFields} from './configFormFields';
import { useAuthFormSubmit } from '@/hooks/useAuthFormSubmit';
import { LOGIN_FORM } from '@/components/forms/const';

const ModalRecoverPassword = dynamic(() => import("@/components/modals/ModalRecoverPassword"), {ssr: false})


export default function AuthForm({ 
    action = null,
    authType,
}) {
    const schema = schemaOptions[authType]
    const fields = schemaFields[authType]

    const { onSubmit, formError } = useAuthFormSubmit(
        action,
        authType
    );
    
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, trigger } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <section className={`${styles.login_main_container} flex-col-gap-xl`}>
            <div className={`${styles.login_form_container} flex-col-gap-xl`}>
                <h2>{ authType === LOGIN_FORM ? "Log in to your account" : "Become a Flowell member"}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={`${styles.login_form} flex-col-gap`}>
                    {
                        fields.map(({ key: keyField, label, type, placeholder, onChange }) => (
                            <div key={keyField}>
                                <input
                                    {...register(`${keyField}`)}
                                    type={type}
                                    name={keyField}
                                    id={keyField}
                                    placeholder={placeholder}
                                    onBlur={() => {
                                        trigger(keyField);
                                    }}
                                    {...(onChange && { onChange: (e) => onChange(e, setValue) })}
                                />
                                <div className={styles.error_label_container}>
                                    <label htmlFor={keyField}>{label}</label>
                                    <p className={styles.error_login_form}>{errors[keyField]?.message}</p>
                                </div>
                            </div>
                        ))
                    }
                    <button type="submit" disabled={isSubmitting} className="btn_primary_standard btn_sizeXl">
                        { authType === LOGIN_FORM ? "Log in" : "Sign up"}
                    </button>
                </form>
                { authType === LOGIN_FORM && (
                    <ModalRecoverPassword/>
                )}
            </div>
            <div>
                <p className={styles.error_updating_info}>{formError}</p>
            </div>
            <section className={`${styles.login_inside_signup_container} flex-col-gap-xl`}>
                <h2>{ authType === LOGIN_FORM ? "Not registered yet?" : "Already registered?"}</h2>
                <Link href={authType === LOGIN_FORM ? "/register" : "/login"}>
                    { authType === LOGIN_FORM ? "Become a member" : "Log in"}
                </Link>
                <br />
            </section>
        </section>
    );
}