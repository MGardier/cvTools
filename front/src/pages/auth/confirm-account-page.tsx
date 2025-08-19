import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ConfirmAccountForm } from "@/features/auth/components/form/confirm-account-form";
import { ReSendConfirmAccountForm } from "@/features/auth/components/form/resend-confirm-account-form";
import {  useSearchParams } from "react-router-dom";



export function ConfirmAccountPage() {
  const [searchParams] = useSearchParams();
   const token = searchParams.get('token');
  const email = searchParams.get('email'); 


  return (
    <AuthLayout>
      {token ? <ConfirmAccountForm {...{token}}/>:       <ReSendConfirmAccountForm defaultEmail={email}/>}

    </AuthLayout>
  );
}
