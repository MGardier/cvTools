import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ResetPasswordForm } from "@/features/auth/components/form/reset-password-form";
import { SendForgotPasswordForm } from "@/features/auth/components/form/send-forgot-password-form";
import {  useSearchParams } from "react-router-dom";



export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
   const token = searchParams.get('token');
  const email = searchParams.get('email'); 


  return (
    <AuthLayout>
      {token ? <ResetPasswordForm {...{token}}/>:       <SendForgotPasswordForm defaultEmail={email}/>}
    </AuthLayout>
  );
}
