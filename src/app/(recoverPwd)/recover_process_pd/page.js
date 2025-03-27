import SetNewPasswordForm from "@/components/forms/SetNewPasswordForm";
import { Suspense } from "react";

export default function RecoverPwd() {
    
    return (  
        <Suspense fallback={<div>Loading...</div>}>
            <SetNewPasswordForm />
        </Suspense> 
    );
}