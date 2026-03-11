import AuthForm from "@/components/forms/AuthForm";
import { LOGIN_FORM } from "@/components/forms/const";

export default function LogIn() {  
  return (
      <AuthForm authType={LOGIN_FORM}/>
    );
}
