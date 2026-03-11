import { registerUser } from "@/actions/registerUser";
import AuthForm from "@/components/forms/AuthForm";
import { REGISTER_FORM } from "@/components/forms/const";

export default function Register() {  
  return (
    <AuthForm action={registerUser} authType={REGISTER_FORM}/>
  );
}
