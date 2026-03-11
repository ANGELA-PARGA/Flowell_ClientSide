import { useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { REGISTER_FORM, LOGIN_FORM } from "@/components/forms/const";

/**
 * Hook for managing authentication form submissions (Login and Registration).
 * * Logic Flow:
 * - **Registration**: Executes the provided `action` (e.g., API call to create user), 
 * then automatically triggers a NextAuth `signIn` to log the user in immediately.
 * - **Login**: Skips the action and goes directly to the NextAuth `signIn` flow.
 * * @param {Function} action - An async function/thunk to execute (primarily for registration logic).
 * @param {'REGISTER_FORM' | 'LOGIN_FORM'} authType - Constant identifying the authentication mode.
 * * @returns {Object} Returns the submission handler and any catchable form errors.
 * @property {string | undefined} formError - The error message string if the submission fails.
 * @property {Function} onSubmit - The async function to be passed to the form's onSubmit prop.
 */

export function useAuthFormSubmit(action, authType) {
    const [formError, setFormError] = useState();
    const router = useRouter();

    const onSubmit = async (data) => {
        console.log(`[Authentication type: ${authType}] - Entry:`, data); 
                    
        try {
            if(authType === REGISTER_FORM) {
                await action(data); 
                toast.success(`Account succesfully created!`)
            }

            const responseNextAuth = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (responseNextAuth?.error) {
                console.error(`[Authentication type: ${authType}] - Error response from NextAuth:`, responseNextAuth);
                throw new Error(responseNextAuth.error)
            }

            router.push("/");    
            router.refresh();         
            console.log(`[Authentication type: ${authType}] onSubmit - Success`);
        } catch (error) {
            const isReg = authType === REGISTER_FORM;
            toast.error(isReg 
                ? 'Failed to register the account. Please try again.' 
                : 'Invalid email or password.');
            console.error(`[Authentication type: ${authType}] - Error:`, error);
            setFormError(error.message);
        } 
    }; 


    return { 
        formError, 
        onSubmit 
    };
}